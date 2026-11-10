// src/design-system/constants/colors.ts

export const COLOR_PALETTES_LIST = [
  { palette: "neutral", label: "Neutral", primaryHex: "#808080" },
  { palette: "grey", label: "Grey", primaryHex: "#707D8F" },

  { palette: "cream", label: "Cream", primaryHex: "#BD9042" },
  { palette: "caramel", label: "Caramel", primaryHex: "#D68529" },
  { palette: "brown", label: "Brown", primaryHex: "#A86C57" },

  { palette: "maroon", label: "Maroon", primaryHex: "#D22D48" },
  { palette: "red", label: "Red", primaryHex: "#EB1414" },
  { palette: "salmon", label: "Salmon", primaryHex: "#ED3612" },

  { palette: "pastelOrange", label: "Pastel Orange", primaryHex: "#F2520D" },
  { palette: "orange", label: "Orange", primaryHex: "#F98006" },
  { palette: "gold", label: "Gold", primaryHex: "#F2AD0D" },
  { palette: "yellow", label: "Yellow", primaryHex: "#FAC905" },

  { palette: "lime", label: "Lime", primaryHex: "#C3DB24" },
  { palette: "olive", label: "Olive", primaryHex: "#96C23D" },
  { palette: "green", label: "Green", primaryHex: "#26D968" },
  { palette: "jade", label: "Jade", primaryHex: "#1FE0A6" },
  { palette: "teal", label: "Teal", primaryHex: "#19E6D1" },

  { palette: "tealBlue", label: "Teal Blue", primaryHex: "#1FDAE0" },
  { palette: "cyan", label: "Cyan", primaryHex: "#0DCCF2" },
  { palette: "sky", label: "Sky", primaryHex: "#0DA6F2" },
  { palette: "powderBlue", label: "Powder Blue", primaryHex: "#427FBD" },
  { palette: "blue", label: "Blue", primaryHex: "#1471EB" },
  { palette: "sapphire", label: "Sapphire", primaryHex: "#1C44E3" },
  { palette: "indigo", label: "Indigo", primaryHex: "#3947C6" },
  { palette: "discord", label: "Discord", primaryHex: "#1224ED" },

  {
    palette: "powderLavender",
    label: "Powder Lavender",
    primaryHex: "#483DC2",
  },
  { palette: "lavender", label: "Lavender", primaryHex: "#530FF0" },
  { palette: "purple", label: "Purple", primaryHex: "#9F20DF" },

  { palette: "bubblegumPink", label: "Bubblegum Pink", primaryHex: "#F20DAD" },
  { palette: "pink", label: "Pink", primaryHex: "#E81780" },
];

export const COLOR_PALETTE_OPTIONS = COLOR_PALETTES_LIST.map((c) => c.palette);

export const COLORS_LIST: string[] = [
  "#63B3ED",
  "#3182CE",
  "#5A67D8",
  "#7DDFA3",
  "#22c55e",
  "#F6E05E",
  "#F6AD55",
  "#F56565",
  "#F687B3",
  "#D6BCFA",
  "#9F7AEA",
  "#D53F8C",
  "#E53E3E",
];

export const LEGEND_COLOR_OPTIONS_LIST = [
  {
    label: "Set2",
    colors: [
      "#66c2a5",
      "#fc8d62",
      "#8da0cb",
      "#e78ac3",
      "#a6d854",
      "#ffd92f",
      "#e5c494",
      "#b3b3b3",
    ],
  },
  {
    label: "Set1",
    colors: [
      "#e41a1c",
      "#377eb8",
      "#4daf4a",
      "#984ea3",
      "#ff7f00",
      "#ffff33",
      "#a65628",
      "#f781bf",
    ],
  },
  {
    label: "Set3",
    colors: [
      "#8dd3c7",
      "#ffffb3",
      "#bebada",
      "#fb8072",
      "#80b1d3",
      "#fdb462",
      "#b3de69",
      "#fccde5",
    ],
  },
  {
    label: "Paired",
    colors: [
      "#a6cee3",
      "#1f78b4",
      "#b2df8a",
      "#33a02c",
      "#fb9a99",
      "#e31a1c",
      "#fdbf6f",
      "#ff7f00",
    ],
  },
  {
    label: "Dark2",
    colors: [
      "#1b9e77",
      "#d95f02",
      "#7570b3",
      "#e7298a",
      "#66a61e",
      "#e6ab02",
      "#a6761d",
      "#666666",
    ],
  },
  {
    label: "Blue Gradient",
    colors: [
      "#e3f2fd",
      "#bbdefb",
      "#90caf9",
      "#64b5f6",
      "#42a5f5",
      "#2196f3",
      "#1e88e5",
      "#1976d2",
    ],
  },
  {
    label: "Green Gradient",
    colors: [
      "#CFFBE9",
      "#A0F7DC",
      "#6EE8CD",
      "#47D1BF",
      "#16b3ac",
      "#109399",
      "#0B7180",
      "#075267",
    ],
  },
  {
    label: "Orange Gradient",
    colors: [
      "#fff3e0",
      "#ffe0b2",
      "#ffcc80",
      "#ffb74d",
      "#ffa726",
      "#ff9800",
      "#fb8c00",
      "#f57c00",
    ],
  },
  {
    label: "Purple Gradient",
    colors: [
      "#f2f2ff",
      "#d6d5f5",
      "#bbb9ec",
      "#a09de3",
      "#8e8cd8",
      "#7c7ac4",
      "#6a68b0",
      "#58569c",
    ],
  },
  {
    label: "Absolut Orange",
    colors: [
      "#ffa726",
      "#ffa726",
      "#ffa726",
      "#ffa726",
      "#ffa726",
      "#ffa726",
      "#ffa726",
      "#ffa726",
    ],
  },
];
