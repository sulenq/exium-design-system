// src/design-system/components/media/camera-capture/camera-capture.test.tsx

import { CameraCapture } from "@/design-system/components/media/camera-capture/camera-capture";
import { fitWithin, sha256Hex } from "@/design-system/components/media/camera-capture/camera-capture.utils";
import { Field } from "@/design-system/components/input/field/field";
import { installFakeCamera, uninstallFakeCamera } from "@/test/media-mocks";
import { renderWithSystem } from "@/test/render";
import { fireEvent, screen, waitFor, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

let urlCounter = 0;

beforeEach(() => {
  urlCounter = 0;
  Object.defineProperty(URL, "createObjectURL", {
    configurable: true,
    value: vi.fn(() => `blob:preview-${(urlCounter += 1)}`),
  });
  Object.defineProperty(URL, "revokeObjectURL", { configurable: true, value: vi.fn() });
  Object.defineProperty(HTMLCanvasElement.prototype, "getContext", {
    configurable: true,
    value: () => ({ drawImage: vi.fn() }),
  });
  Object.defineProperty(HTMLCanvasElement.prototype, "toBlob", {
    configurable: true,
    value(callback: (blob: Blob) => void) {
      callback(new Blob([`jpeg-${urlCounter}`], { type: "image/jpeg" }));
    },
  });
});

afterEach(() => {
  uninstallFakeCamera();
  vi.restoreAllMocks();
});

async function openCamera(name = /Ambil foto/) {
  fireEvent.click(screen.getByRole("button", { name }));
  const dialog = await screen.findByRole("dialog", { name: "Kamera" });
  const shutter = await within(dialog).findByRole("button", { name: "Ambil foto" });
  await waitFor(() => expect(shutter).toBeEnabled());
  return { dialog, shutter };
}

describe("CameraCapture", () => {
  it("captures photos and returns them on Selesai", async () => {
    installFakeCamera();
    const onChange = vi.fn();
    renderWithSystem(<CameraCapture multiple={true} withHash={true} onChange={onChange} />);

    const { dialog, shutter } = await openCamera();
    fireEvent.click(shutter);
    await within(dialog).findByRole("img", { name: "Foto 1" });
    fireEvent.click(shutter);
    await within(dialog).findByRole("img", { name: "Foto 2" });

    fireEvent.click(within(dialog).getByRole("button", { name: /Selesai \(2\)/ }));
    expect(onChange).toHaveBeenCalledTimes(1);
    const items = onChange.mock.calls[0][0];
    expect(items).toHaveLength(2);
    expect(items[0]).toMatchObject({ type: "image", previewUrl: "blob:preview-1" });
    expect(items[0].file.type).toBe("image/jpeg");
    expect(items[0].hash).toMatch(/^[0-9a-f]{64}$/);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(screen.getAllByRole("img")).toHaveLength(2);
  });

  it("replaces the photo in single mode", async () => {
    installFakeCamera();
    const onChange = vi.fn();
    renderWithSystem(<CameraCapture onChange={onChange} />);

    const { dialog, shutter } = await openCamera();
    fireEvent.click(shutter);
    await within(dialog).findByRole("img", { name: "Foto 1" });
    fireEvent.click(shutter);
    await waitFor(() => expect(URL.revokeObjectURL).toHaveBeenCalledWith("blob:preview-1"));
    expect(within(dialog).getAllByRole("img")).toHaveLength(1);

    fireEvent.click(within(dialog).getByRole("button", { name: /Selesai \(1\)/ }));
    expect(onChange.mock.calls[0][0][0].previewUrl).toBe("blob:preview-2");
  });

  it("retakes a chosen item and stops at maxFiles", async () => {
    installFakeCamera();
    const onChange = vi.fn();
    renderWithSystem(<CameraCapture multiple={true} maxFiles={2} onChange={onChange} />);

    const { dialog, shutter } = await openCamera();
    fireEvent.click(shutter);
    await within(dialog).findByRole("img", { name: "Foto 1" });
    fireEvent.click(shutter);
    await within(dialog).findByRole("img", { name: "Foto 2" });
    expect(within(dialog).getByText("Maks 2")).toBeInTheDocument();
    expect(shutter).toBeDisabled();

    fireEvent.click(within(dialog).getByRole("button", { name: "Ulangi item 1" }));
    const retakeShutter = within(dialog).getByRole("button", { name: "Ambil ulang foto" });
    await waitFor(() => expect(retakeShutter).toBeEnabled());
    fireEvent.click(retakeShutter);
    await waitFor(() => expect(URL.revokeObjectURL).toHaveBeenCalledWith("blob:preview-1"));

    fireEvent.click(within(dialog).getByRole("button", { name: /Selesai \(2\)/ }));
    expect(onChange.mock.calls[0][0].map((item: { previewUrl: string }) => item.previewUrl)).toEqual([
      "blob:preview-3",
      "blob:preview-2",
    ]);
  });

  it("asks before discarding new captures", async () => {
    installFakeCamera();
    const onChange = vi.fn();
    renderWithSystem(<CameraCapture multiple={true} onChange={onChange} />);

    const { dialog, shutter } = await openCamera();
    fireEvent.click(shutter);
    await within(dialog).findByRole("img", { name: "Foto 1" });
    fireEvent.click(within(dialog).getByRole("button", { name: "Tutup kamera" }));

    const confirm = within(dialog).getByRole("alertdialog", { name: "Buang 1 item baru?" });
    fireEvent.click(within(confirm).getByRole("button", { name: "Buang" }));
    expect(onChange).not.toHaveBeenCalled();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(URL.revokeObjectURL).toHaveBeenCalledWith("blob:preview-1");
  });

  it("shows the KTP guide and uses the front camera for selfies", async () => {
    const { getUserMedia } = installFakeCamera();
    const { unmount } = renderWithSystem(<CameraCapture frameVariant={"ktp"} />);
    const { dialog } = await openCamera();
    expect(dialog.querySelector('[data-frame="ktp"]')).not.toBeNull();
    expect(within(dialog).getByText(/sudut KTP terlihat/)).toBeInTheDocument();
    expect(getUserMedia.mock.calls[0][0].video.facingMode).toEqual({ ideal: "environment" });
    unmount();

    renderWithSystem(<CameraCapture frameVariant={"selfie"} />);
    await openCamera();
    expect(getUserMedia.mock.lastCall?.[0].video.facingMode).toEqual({ ideal: "user" });
  });

  it("explains a denied camera permission", async () => {
    installFakeCamera(() => Promise.reject(new DOMException("denied", "NotAllowedError")));
    renderWithSystem(<CameraCapture />);
    fireEvent.click(screen.getByRole("button", { name: /Ambil foto/ }));
    expect(await screen.findByText("Izin kamera ditolak")).toBeInTheDocument();
  });

  it("reflects an invalid Field", () => {
    installFakeCamera();
    renderWithSystem(
      <Field label={"Foto ternak"} invalid={true} errorText={"Wajib diisi"}>
        <CameraCapture />
      </Field>,
    );
    expect(screen.getByRole("button", { name: /Ambil foto/ })).toHaveAttribute("aria-invalid", "true");
  });
});

describe("CameraCapture video", () => {
  class FakeMediaRecorder {
    static isTypeSupported = (type: string) => type === "video/webm";
    state = "inactive";
    mimeType = "video/webm";
    ondataavailable: ((event: { data: Blob }) => void) | null = null;
    onstop: (() => void) | null = null;
    start() {
      this.state = "recording";
    }
    stop() {
      this.state = "inactive";
      this.ondataavailable?.({ data: new Blob(["video"], { type: "video/webm" }) });
      this.onstop?.();
    }
  }

  it("records a video and stops at the max duration", async () => {
    vi.stubGlobal("MediaRecorder", FakeMediaRecorder);
    const { getUserMedia } = installFakeCamera();
    const onChange = vi.fn();
    renderWithSystem(<CameraCapture accept={"video"} maxVideoDurationSec={1} onChange={onChange} />);

    fireEvent.click(screen.getByRole("button", { name: /Rekam video/ }));
    const dialog = await screen.findByRole("dialog", { name: "Kamera" });
    const record = await within(dialog).findByRole("button", { name: "Mulai rekam" });
    await waitFor(() => expect(record).toBeEnabled());
    expect(getUserMedia.mock.calls[0][0].audio).toBe(true);

    fireEvent.click(record);
    expect(await within(dialog).findByRole("timer")).toHaveTextContent("/ 0:01");
    // auto-stop after 1 s
    expect(await within(dialog).findByLabelText("Video 1", {}, { timeout: 3000 })).toBeInTheDocument();

    fireEvent.click(within(dialog).getByRole("button", { name: /Selesai \(1\)/ }));
    expect(onChange.mock.calls[0][0][0]).toMatchObject({ type: "video" });
    expect(onChange.mock.calls[0][0][0].file.name).toMatch(/\.webm$/);
    vi.unstubAllGlobals();
  });
});

describe("camera-capture utils", () => {
  it("fits the longest side within maxWidth", () => {
    expect(fitWithin(4000, 3000, 1600)).toEqual({ width: 1600, height: 1200 });
    expect(fitWithin(800, 600, 1600)).toEqual({ width: 800, height: 600 });
    expect(fitWithin(3000, 4000, 1600)).toEqual({ width: 1200, height: 1600 });
  });

  it("hashes a file with SHA-256", async () => {
    expect(await sha256Hex(new Blob(["abc"]))).toBe(
      "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad",
    );
  });
});
