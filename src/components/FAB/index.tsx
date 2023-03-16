import { FontAwesome } from "@expo/vector-icons";
import { StackProps } from "@tamagui/web";
import { FunctionComponent } from "react";
import { Button, ButtonProps, Stack } from "tamagui";

type FABProps = {
  onPress: () => void;
  icon?: JSX.Element | FunctionComponent<{ color?: string; size?: number }>;
  stackStyle?: StackProps;
  buttonStyle?: ButtonProps;
};

const FAB = ({ onPress, icon, stackStyle, buttonStyle }: FABProps) => {
  const displayIcon = icon ?? (
    <FontAwesome name="plus" size={30} color="black" />
  );

  return (
    <Stack
      position="absolute"
      bottom={0}
      flex={1}
      alignItems="flex-end"
      right={0}
      left={0}
      mr={20}
      mb={20}
      {...stackStyle}
    >
      <Button
        width={90}
        height={90}
        borderRadius={50}
        onPress={onPress}
        elevation={3}
        animation="bouncy"
        pressStyle={{ scale: 1.1 }}
        icon={displayIcon}
        {...buttonStyle}
      ></Button>
    </Stack>
  );
};

export default FAB;
