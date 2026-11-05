// src/features/design-system-v2-docs/components/component-playground.tsx

import { Tabs } from "@/design-system/components/disclosure/ui/tabs";
import { Input } from "@/design-system/components/input/ui/input";
import SelectInput from "@/design-system/components/input/ui/select";
import { Switch } from "@/design-system/components/input/ui/switch";
import { Box } from "@/design-system/components/layout/ui/box";
import { HStack, VStack } from "@/design-system/components/layout/ui/flex-box";
import { SimpleGrid } from "@/design-system/components/layout/ui/grid";
import { Badge } from "@/design-system/components/typography/ui/badge";
import { P } from "@/design-system/components/typography/ui/p";
import { ComponentPlaygroundContainer } from "@/features/design-system-v2-docs/components/component-playground-container";
import type { ComponentDocSpec } from "@/features/design-system-v2-docs/types/ds-docs-spec.type";
import { useState } from "react";

export const ComponentPlayground = ({ spec }: { spec: ComponentDocSpec }) => {
  // States
  const [propsState, setPropsState] = useState<Record<string, unknown>>(
    spec.defaultProps,
  );

  // Handlers
  const handlePropChange = (name: string, value: unknown) => {
    setPropsState((prev) => ({ ...prev, [name]: value }));
  };

  const ComponentToRender = spec.component;

  return (
    <VStack align={"stretch"} gap={6} w={"full"}>
      {/* 1. Overview Header */}
      <VStack align={"start"} gap={2}>
        <HStack gap={2}>
          <P fontSize={"2xl"} fontWeight={"bold"}>
            {spec.title}
          </P>
          <Badge variant={"subtle"}>{spec.category}</Badge>
        </HStack>
        <P color={"fg.muted"}>{spec.description}</P>
      </VStack>

      {/* 2. Import Path Card (Langsung di atas preview) */}
      <Box
        p={3}
        rounded={"md"}
        bg={"bg.subtle"}
        border={"1px solid"}
        borderColor={"border.subtle"}
      >
        <P fontSize={"xs"} color={"fg.subtle"} mb={1}>
          {"IMPORT PATH"}
        </P>
        <P fontFamily={"mono"} fontSize={"sm"} color={"colorPalette.fg"}>
          {spec.importPath}
        </P>
      </Box>

      {/* 3. Hero Live Render Preview */}
      <ComponentPlaygroundContainer>
        {spec.renderPlayground ? (
          spec.renderPlayground(propsState, handlePropChange)
        ) : (
          <ComponentToRender {...propsState} />
        )}
      </ComponentPlaygroundContainer>

      {/* 4. Three Tabs: Playground, Props Spec, A11y (Default variant) */}
      <Tabs.Root defaultValue={"playground"}>
        <Tabs.List>
          <Tabs.Trigger value={"playground"}>{"Playground"}</Tabs.Trigger>
          <Tabs.Trigger value={"props"}>{"Props Spec"}</Tabs.Trigger>
          <Tabs.Trigger value={"a11y"}>{"A11y"}</Tabs.Trigger>
        </Tabs.List>

        {/* Tab 1: Playground Knobs */}
        <Tabs.Content value={"playground"} pt={4}>
          <SimpleGrid columns={[1, 2, 3]} gap={4}>
            {spec.propsSpec
              .filter((prop) => prop.controlKind !== undefined)
              .map((prop) => (
                <Box key={prop.name} p={3} rounded={"md"} bg={"bg.subtle"}>
                  <P fontSize={"xs"} fontWeight={"bold"} mb={2}>
                    {prop.name}
                  </P>

                  {prop.controlKind === "text" && (
                    <Input
                      size={"sm"}
                      value={String(propsState[prop.name] ?? "")}
                      onChange={(e) =>
                        handlePropChange(prop.name, e.target.value)
                      }
                      placeholder={`Isi ${prop.name}`}
                    />
                  )}

                  {prop.controlKind === "boolean" && (
                    <Switch
                      checked={Boolean(propsState[prop.name])}
                      onCheckedChange={(details) =>
                        handlePropChange(prop.name, details.checked)
                      }
                    >
                      {String(Boolean(propsState[prop.name]))}
                    </Switch>
                  )}

                  {prop.controlKind === "select" && prop.options && (
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
                  )}
                </Box>
              ))}
          </SimpleGrid>
        </Tabs.Content>

        {/* Tab 2: Props Spec Table */}
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
                  <th style={{ padding: "8px" }}>{"Prop"}</th>
                  <th style={{ padding: "8px" }}>{"Type"}</th>
                  <th style={{ padding: "8px" }}>{"Required"}</th>
                  <th style={{ padding: "8px" }}>{"Default"}</th>
                  <th style={{ padding: "8px" }}>{"Description"}</th>
                </tr>
              </thead>
              <tbody>
                {spec.propsSpec.map((p) => (
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
                      {p.required ? (
                        <Badge colorPalette={"red"} size={"xs"}>
                          {"Required"}
                        </Badge>
                      ) : (
                        <Badge
                          colorPalette={"gray"}
                          variant={"subtle"}
                          size={"xs"}
                        >
                          {"Optional"}
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
                ))}
              </tbody>
            </table>
          </Box>
        </Tabs.Content>

        {/* Tab 3: A11y & Keyboard Guidelines */}
        <Tabs.Content value={"a11y"} pt={4}>
          <VStack align={"stretch"} gap={4}>
            {spec.a11y?.keyboardNav && spec.a11y.keyboardNav.length > 0 && (
              <Box>
                <P fontWeight={"bold"} mb={2}>
                  {"Keyboard Navigation"}
                </P>
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
                    {spec.a11y.keyboardNav.map((kb) => (
                      <tr
                        key={kb.key}
                        style={{
                          borderBottom:
                            "1px solid var(--chakra-colors-border-subtle)",
                        }}
                      >
                        <td style={{ padding: "8px" }}>
                          <Badge variant={"outline"}>{kb.key}</Badge>
                        </td>
                        <td style={{ padding: "8px" }}>{kb.action}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Box>
            )}

            {spec.a11y?.notes && (
              <Box
                p={3}
                rounded={"md"}
                bg={"bg.subtle"}
                border={"1px solid"}
                borderColor={"border.subtle"}
              >
                <P fontSize={"xs"} fontWeight={"bold"} mb={1}>
                  {"A11Y NOTES"}
                </P>
                <P fontSize={"sm"} color={"fg.muted"}>
                  {spec.a11y.notes}
                </P>
              </Box>
            )}

            {!spec.a11y && (
              <P color={"fg.muted"}>
                {"Komponen ini mewarisi standar aksesibilitas WCAG AA dari primitive Radix."}
              </P>
            )}
          </VStack>
        </Tabs.Content>
      </Tabs.Root>
    </VStack>
  );
};

