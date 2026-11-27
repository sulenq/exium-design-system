// src/design-system/components/media/qr-scanner/qr-scanner.test.tsx

import { QrScanner } from "@/design-system/components/media/qr-scanner/qr-scanner";
import {
  installFakeBarcodeDetector,
  installFakeCamera,
  uninstallFakeCamera,
} from "@/test/media-mocks";
import { renderWithSystem } from "@/test/render";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

afterEach(() => {
  uninstallFakeCamera();
  vi.restoreAllMocks();
});

describe("QrScanner", () => {
  it("accepts a valid scan and offers to scan again in single mode", async () => {
    installFakeCamera();
    installFakeBarcodeDetector(["TQ-0001"]);
    const onScan = vi.fn();
    renderWithSystem(<QrScanner onScan={onScan} haptic={false} sound={false} />);

    await waitFor(() => expect(onScan).toHaveBeenCalledTimes(1));
    expect(onScan.mock.calls[0][0]).toMatchObject({ value: "TQ-0001", format: "qr_code" });
    expect(typeof onScan.mock.calls[0][0].scannedAt).toBe("number");
    expect(screen.getByRole("status")).toHaveTextContent("TQ-0001");
    expect(await screen.findByRole("button", { name: "Scan lagi" }, { timeout: 3000 })).toBeInTheDocument();
  });

  it("rejects with the validator's message", async () => {
    installFakeCamera();
    installFakeBarcodeDetector(["XX-9"]);
    const onScan = vi.fn();
    const onReject = vi.fn();
    renderWithSystem(
      <QrScanner
        onScan={onScan}
        onReject={onReject}
        validate={(value) =>
          value.startsWith("ITEM-") ? { ok: true } : { ok: false, message: "Format kode tidak valid" }
        }
        haptic={false}
        sound={false}
      />,
    );

    await waitFor(() => expect(onReject).toHaveBeenCalledTimes(1));
    expect(onScan).not.toHaveBeenCalled();
    expect(screen.getByRole("status")).toHaveTextContent("Format kode tidak valid");
  });

  it("ignores the same value inside the cooldown in continuous mode", async () => {
    installFakeCamera();
    const detector = installFakeBarcodeDetector(["TQ-1", "TQ-1"]);
    const onScan = vi.fn();
    renderWithSystem(
      <QrScanner onScan={onScan} mode={"continuous"} cooldownMs={60000} haptic={false} sound={false} />,
    );

    await waitFor(() => expect(onScan).toHaveBeenCalledTimes(1));
    detector.push("TQ-2");
    await waitFor(() => expect(onScan).toHaveBeenCalledTimes(2), { timeout: 4000 });
    expect(onScan.mock.calls.map((call) => call[0].value)).toEqual(["TQ-1", "TQ-2"]);
  });

  it("explains a denied permission and still allows manual entry", async () => {
    installFakeCamera(() => Promise.reject(new DOMException("denied", "NotAllowedError")));
    installFakeBarcodeDetector([]);
    const onScan = vi.fn();
    renderWithSystem(
      <QrScanner
        onScan={onScan}
        manualEntry={{ label: "Kode QR", pattern: /^ITEM-\d+$/ }}
        haptic={false}
        sound={false}
      />,
    );

    expect(await screen.findByText("Izin kamera ditolak")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /Ketik manual/ }));

    const input = screen.getByRole("textbox", { name: /Kode QR/ });
    fireEvent.change(input, { target: { value: "abc" } });
    fireEvent.click(screen.getByRole("button", { name: "Gunakan" }));
    expect(await screen.findByText("Format tidak sesuai")).toBeInTheDocument();

    fireEvent.change(input, { target: { value: "ITEM-42" } });
    fireEvent.click(screen.getByRole("button", { name: "Gunakan" }));
    await waitFor(() => expect(onScan).toHaveBeenCalledWith(expect.objectContaining({ value: "ITEM-42", format: "manual" })));
  });

  it("shows the unsupported state without mediaDevices", async () => {
    uninstallFakeCamera();
    renderWithSystem(<QrScanner onScan={vi.fn()} />);
    expect(await screen.findByText("Kamera tidak tersedia")).toBeInTheDocument();
  });

  it("releases the camera on unmount", async () => {
    const { track, getUserMedia } = installFakeCamera();
    installFakeBarcodeDetector([]);
    const { unmount } = renderWithSystem(<QrScanner onScan={vi.fn()} />);
    await waitFor(() => expect(getUserMedia).toHaveBeenCalled());
    await waitFor(() => expect(screen.getByRole("region")).toHaveAttribute("data-status", "active"));
    unmount();
    expect(track.stop).toHaveBeenCalled();
  });

  it("toggles the flashlight when supported", async () => {
    const { track } = installFakeCamera();
    installFakeBarcodeDetector([]);
    renderWithSystem(<QrScanner onScan={vi.fn()} />);
    const torch = await screen.findByRole("button", { name: "Nyalakan senter" });
    fireEvent.click(torch);
    await waitFor(() => expect(track.applyConstraints).toHaveBeenCalledWith({ advanced: [{ torch: true }] }));
    expect(await screen.findByRole("button", { name: "Matikan senter" })).toHaveAttribute("aria-pressed", "true");
  });
});
