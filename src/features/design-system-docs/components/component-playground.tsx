// src/features/design-system-docs/components/component-playground.tsx

import { Button } from "@/design-system/components/button/ui/button";
import { Tabs } from "@/design-system/components/disclosure/ui/tabs";
import { AppIcon } from "@/design-system/components/icon/ui/app-icon";
import { Input } from "@/design-system/components/input/ui/input";
import { NumberInput } from "@/design-system/components/input/ui/number-input";
import SelectInput from "@/design-system/components/input/ui/select";
import { Switch } from "@/design-system/components/input/ui/switch";
import { Box } from "@/design-system/components/layout/ui/box";
import { HStack, VStack } from "@/design-system/components/layout/ui/flex-box";
import { SimpleGrid } from "@/design-system/components/layout/ui/grid";
import { Badge } from "@/design-system/components/typography/ui/badge";
import { P } from "@/design-system/components/typography/ui/p";
import { CodeBlock } from "@/features/design-system-docs/components/code-block";
import { ComponentPlaygroundContainer } from "@/features/design-system-docs/components/component-playground-container";
import type { ComponentDocSpec } from "@/features/design-system-docs/types/ds-docs-spec.type";
import { ColorPaletteSelect } from "@/features/shared/components/color-palette.select";
import { CheckIcon, CopyIcon } from "lucide-react";
import { useState } from "react";

export const ComponentPlayground = ({ spec }: { spec: ComponentDocSpec }) => {
  // States
  const [propsState, setPropsState] = useState<Record<string, unknown>>(
    spec.defaultProps,
  );
  const [copied, setCopied] = useState(false);

  // Handlers
  const handlePropChange = (name: string, value: unknown) => {
    setPropsState((prev) => ({ ...prev, [name]: value }));
  };

  const ComponentToRender = spec.component;

  const generateUsageCode = () => {
    const propStrings = Object.entries(propsState)
      .filter(([key, val]) => {
        if (key === "children") return false;
        if (val === undefined || val === null || val === false) return false;
        // Don't print if it equals the default
        if (spec.defaultProps[key] === val && val !== true) return false;
        return true;
      })
      .map(([key, val]) => {
        if (typeof val === "boolean" && val === true) return `${key}={true}`;
        if (typeof val === "string") return `${key}={"${val}"}`;
        return `${key}={${JSON.stringify(val)}}`;
      })
      .join(" ");

    const componentName = spec.title.split(" ")[0];
    const propsPrefix = propStrings ? ` ${propStrings}` : "";
    const childrenVal = propsState.children;

    let jsxCode = `<${componentName}${propsPrefix} />`;
    if (
      childrenVal !== undefined &&
      childrenVal !== null &&
      childrenVal !== ""
    ) {
      jsxCode = `<${componentName}${propsPrefix}>\n  {"${String(childrenVal)}"}\n</${componentName}>`;
    }

    return `${spec.importPath}\n\n${jsxCode}`;
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generateUsageCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <VStack align={"stretch"} gap={6} w={"full"}>
      {/* Overview Header */}
      <VStack align={"start"} gap={2}>
        <HStack gap={2} align={"center"}>
          <P fontSize={"3xl"} fontWeight={"bold"}>
            {spec.title}
          </P>
          <Badge variant={"subtle"}>{spec.category}</Badge>
        </HStack>
        <P color={"fg.muted"}>{spec.description}</P>
      </VStack>

      {/* Code Card (Title Code, Import + Live Component Snippet, Dynamic & Clean) */}
      <HStack
        p={3}
        rounded={"md"}
        bg={"bg.subtle"}
        align={"flex-start"}
        justify={"space-between"}
      >
        <VStack align={"start"} gap={1} flex={1} overflow={"hidden"}>
          <P fontSize={"xs"} color={"fg.subtle"} fontWeight={"semibold"}>
            {"CODE"}
          </P>
          <CodeBlock code={generateUsageCode()} language={"tsx"} />
        </VStack>

        <Button size={"xs"} variant={"ghost"} onClick={handleCopyCode}>
          {copied ? (
            <AppIcon icon={CheckIcon} size={"sm"} />
          ) : (
            <AppIcon icon={CopyIcon} size={"sm"} />
          )}
          {copied ? "Copied!" : "Copy"}
        </Button>
      </HStack>

      {/* Interactive Playground Sandbox */}
      <ComponentPlaygroundContainer>
        {spec.renderPlayground ? (
          spec.renderPlayground(propsState, handlePropChange)
        ) : (
          <ComponentToRender {...propsState} />
        )}
      </ComponentPlaygroundContainer>

      {/* Controls & Props Spec Tabs (Default variant, tanpa Generated Code) */}
      <Tabs.Root defaultValue={"controls"}>
        <Tabs.List>
          <Tabs.Trigger value={"controls"}>{"Playground"}</Tabs.Trigger>
          <Tabs.Trigger value={"props"}>{"Props Specs"}</Tabs.Trigger>
          <Tabs.Trigger value={"a11y"}>{"A11y"}</Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value={"controls"} pt={4}>
          <SimpleGrid columns={[1, 2, 3]} gap={4}>
            {spec.propsSpec
              .filter((prop) => prop.controlKind !== undefined)
              .map((prop) => (
                <Box key={prop.name}>
                  <P
                    fontSize={"xs"}
                    fontWeight={"medium"}
                    color={"fg.muted"}
                    mb={1.5}
                  >
                    {prop.name}
                  </P>

                  {prop.controlKind === "text" && (
                    <Input
                      size={"sm"}
                      value={(propsState[prop.name] as string) ?? ""}
                      onChange={(e) =>
                        handlePropChange(prop.name, e.target.value)
                      }
                    />
                  )}

                  {prop.controlKind === "number" && (
                    <NumberInput
                      size={"sm"}
                      min={prop.name === "page" ? 1 : undefined}
                      value={String(propsState[prop.name] ?? 0)}
                      onValueChange={(details) =>
                        handlePropChange(
                          prop.name,
                          prop.name === "page"
                            ? Math.max(1, Number(details.value) || 1)
                            : Number(details.value) || 0,
                        )
                      }
                    />
                  )}

                  {prop.controlKind === "boolean" && (
                    <Switch
                      checked={(propsState[prop.name] as boolean) ?? false}
                      onCheckedChange={(e) =>
                        handlePropChange(prop.name, e.checked)
                      }
                    >
                      <P fontSize={"xs"}>
                        {propsState[prop.name] ? "True" : "False"}
                      </P>
                    </Switch>
                  )}

                  {prop.name === "colorPalette" ? (
                    <ColorPaletteSelect
                      value={String(propsState[prop.name] ?? "")}
                      onValueChange={(val) =>
                        handlePropChange(prop.name, String(val ?? ""))
                      }
                      size={"sm"}
                      selectMode={"default"}
                    />
                  ) : prop.controlKind === "select" && prop.options ? (
                    <SelectInput
                      size={"sm"}
                      placeholder={`Pilih ${prop.name}`}
                      value={String(propsState[prop.name] ?? "")}
                      options={prop.options.map((opt) => ({
                        label: String(opt),
                        value: String(opt),
                      }))}
                      onValueChange={(val) =>
                        handlePropChange(prop.name, String(val ?? ""))
                      }
                    />
                  ) : null}
                </Box>
              ))}
          </SimpleGrid>
        </Tabs.Content>

        <Tabs.Content value={"props"} pt={4}>
          <Box overflowX={"auto"}>
            <table
              style={{
                width: "100%",
                textAlign: "left",
                borderCollapse: "collapse",
                fontSize: "13px",
              }}
            >
              <thead>
                <tr
                  style={{
                    borderBottom:
                      "1px solid var(--chakra-colors-border-subtle)",
                  }}
                >
                  <th style={{ padding: "8px" }}>Prop</th>
                  <th style={{ padding: "8px" }}>Type</th>
                  <th style={{ padding: "8px" }}>Required</th>
                  <th style={{ padding: "8px" }}>Default</th>
                  <th style={{ padding: "8px" }}>Description</th>
                </tr>
              </thead>
              <tbody>
                {spec.propsSpec.map((p) => {
                  const isRequired =
                    p.required ??
                    (p.description.toLowerCase().includes("(wajib)") ||
                      p.description.toLowerCase().includes("wajib"));

                  return (
                    <tr
                      key={p.name}
                      style={{
                        borderBottom:
                          "1px solid var(--chakra-colors-border-subtle)",
                      }}
                    >
                      <td style={{ padding: "8px", fontWeight: "bold" }}>
                        {p.name}
                      </td>
                      <td
                        style={{
                          padding: "8px",
                          fontFamily: "monospace",
                          color: "#3182ce",
                        }}
                      >
                        {p.type}
                      </td>
                      <td style={{ padding: "8px" }}>
                        {isRequired ? (
                          <Badge colorPalette={"red"} size={"xs"}>
                            Required
                          </Badge>
                        ) : (
                          <Badge
                            colorPalette={"gray"}
                            variant={"subtle"}
                            size={"xs"}
                          >
                            Optional
                          </Badge>
                        )}
                      </td>
                      <td style={{ padding: "8px" }}>
                        {p.defaultValue !== undefined
                          ? String(p.defaultValue)
                          : "-"}
                      </td>
                      <td style={{ padding: "8px" }}>{p.description}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Box>
        </Tabs.Content>

        <Tabs.Content value={"a11y"} pt={4}>
          <VStack align={"stretch"} gap={5}>
            {/* 1. ARIA Role & Semantics */}
            <Box>
              <P fontSize={"sm"} fontWeight={"bold"} mb={2}>
                {"ARIA Role & Semantics"}
              </P>
              <HStack gap={2} wrap={"wrap"}>
                <Badge variant={"outline"} colorPalette={"blue"}>
                  {spec.a11y?.role ?? (spec.category.toLowerCase().includes("button") ? 'role="button"' : spec.category.toLowerCase().includes("input") ? 'role="textbox / widget"' : spec.category.toLowerCase().includes("overlay") ? 'role="dialog"' : spec.category.toLowerCase().includes("disclosure") ? 'role="tab / region"' : 'role="generic / presentation"')}
                </Badge>
                <Badge variant={"subtle"} colorPalette={"green"}>
                  {"WCAG 2.2 AA Compliant"}
                </Badge>
                <Badge variant={"subtle"} colorPalette={"purple"}>
                  {"Focus Ring Visible"}
                </Badge>
              </HStack>
            </Box>

            {/* 2. Keyboard Navigation Table */}
            <Box>
              <P fontSize={"sm"} fontWeight={"bold"} mb={2}>
                {"Keyboard Navigation"}
              </P>
              <Box overflowX={"auto"}>
                <table
                  style={{
                    width: "100%",
                    textAlign: "left",
                    borderCollapse: "collapse",
                    fontSize: "13px",
                  }}
                >
                  <thead>
                    <tr
                      style={{
                        borderBottom:
                          "1px solid var(--chakra-colors-border-subtle)",
                      }}
                    >
                      <th style={{ padding: "8px", width: "160px" }}>{"Key"}</th>
                      <th style={{ padding: "8px" }}>{"Action"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(spec.a11y?.keyboardNav ?? (
                      spec.category.toLowerCase().includes("button")
                        ? [
                            { key: "Tab", action: "Memindahkan fokus keyboard ke button." },
                            { key: "Enter / Space", action: "Mengeksekusi handler onClick dari button." },
                          ]
                        : spec.category.toLowerCase().includes("input")
                          ? [
                              { key: "Tab", action: "Fokus masuk / keluar field input." },
                              { key: "Enter", action: "Men-submit form atau mengonfirmasi nilai." },
                              { key: "Escape", action: "Membatalkan input atau membersihkan pencarian (jika clearable)." },
                            ]
                          : spec.category.toLowerCase().includes("overlay")
                            ? [
                                { key: "Escape", action: "Menutup overlay/modal/drawer dan mengembalikan fokus ke trigger." },
                                { key: "Tab", action: "Menjaga fokus berputar di dalam modal (Focus Trap)." },
                              ]
                            : [
                                { key: "Tab", action: "Navigasi fokus sekuensial antar elemen interaktif." },
                                { key: "Enter / Space", action: "Mengaktifkan elemen terpilih." },
                              ]
                    )).map((item) => (
                      <tr
                        key={item.key}
                        style={{
                          borderBottom:
                            "1px solid var(--chakra-colors-border-subtle)",
                        }}
                      >
                        <td style={{ padding: "8px" }}>
                          <Badge variant={"outline"} fontFamily={"mono"}>
                            {item.key}
                          </Badge>
                        </td>
                        <td style={{ padding: "8px" }}>{item.action}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Box>
            </Box>

            {/* 3. ARIA Attributes Table */}
            <Box>
              <P fontSize={"sm"} fontWeight={"bold"} mb={2}>
                {"ARIA Attributes & State Management"}
              </P>
              <Box overflowX={"auto"}>
                <table
                  style={{
                    width: "100%",
                    textAlign: "left",
                    borderCollapse: "collapse",
                    fontSize: "13px",
                  }}
                >
                  <thead>
                    <tr
                      style={{
                        borderBottom:
                          "1px solid var(--chakra-colors-border-subtle)",
                      }}
                    >
                      <th style={{ padding: "8px", width: "200px" }}>{"Attribute"}</th>
                      <th style={{ padding: "8px" }}>{"Usage"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(spec.a11y?.ariaAttributes ?? [
                      {
                        attribute: "aria-label / aria-labelledby",
                        description: "Menyediakan nama yang dapat dibaca screen reader saat label visual tidak ada atau berupa icon-only.",
                      },
                      {
                        attribute: "aria-disabled / disabled",
                        description: "Memberi tahu assistive tech bahwa elemen dalam kondisi non-aktif.",
                      },
                      {
                        attribute: "aria-busy",
                        description: "Diterapkan otomatis saat tombol atau komponen dalam kondisi loading/isPending.",
                      },
                    ]).map((attr) => (
                      <tr
                        key={attr.attribute}
                        style={{
                          borderBottom:
                            "1px solid var(--chakra-colors-border-subtle)",
                        }}
                      >
                        <td style={{ padding: "8px", fontFamily: "monospace", color: "#3182ce" }}>
                          {attr.attribute}
                        </td>
                        <td style={{ padding: "8px" }}>{attr.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Box>
            </Box>

            {/* 4. Notes & Best Practices */}
            <Box p={3} rounded={"md"} bg={"bg.subtle"} border={"1px solid"} borderColor={"border.subtle"}>
              <P fontSize={"xs"} fontWeight={"bold"} mb={1}>
                {"ACCESSIBILITY BEST PRACTICE"}
              </P>
              <P fontSize={"sm"} color={"fg.muted"}>
                {spec.a11y?.notes ??
                  "Komponen ini mematuhi standar aksesibilitas Chakra UI v3. Pastikan tombol tanpa teks selalu memiliki prop aria-label, rasio kontras teks minimum 4.5:1 terhadap latar belakang, dan outline fokus tidak dimatikan pada navigation mode keyboard."}
              </P>
            </Box>
          </VStack>
        </Tabs.Content>
      </Tabs.Root>
    </VStack>
  );
};
