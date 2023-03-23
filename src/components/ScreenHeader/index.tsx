import { H1, styled } from "tamagui";

export const ScreenHeader = styled(H1, {
  color: "$slate50",
  size: "$12",
  textShadowColor: "rgba(0, 0, 0, 0.75)",
  textShadowOffset: { width: -1, height: 1 },
  textShadowRadius: 10,
});