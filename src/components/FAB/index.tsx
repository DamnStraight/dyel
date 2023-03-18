import { FontAwesome } from "@expo/vector-icons";
import { StackProps, TamaguiElement } from "@tamagui/web";
import React, { FunctionComponent } from "react";
import { Button, ButtonProps, Stack } from "tamagui";

type FABProps = {
  onPress?: () => void;
  color?: string;
  iconColor?: string;
  icon?: JSX.Element | FunctionComponent<{ color?: string; size?: number }>;
  stackStyle?: StackProps;
  buttonStyle?: ButtonProps;
};

const FAB = React.forwardRef<TamaguiElement, FABProps>(
  (
    {
      onPress,
      color = "white",
      iconColor = "black",
      icon,
      stackStyle,
      buttonStyle,
    },
    ref
  ) => {
    const displayIcon = icon ?? (
      <FontAwesome name="plus" size={30} color={iconColor} />
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
          bg={color}
          width={90}
          height={90}
          borderRadius={50}
          onPress={onPress}
          elevation={3}
          animation="bouncy"
          pressStyle={{ scale: 1.1 }}
          icon={displayIcon}
          ref={ref}
          {...buttonStyle}
        ></Button>
      </Stack>
    );
  }
);

export default FAB;
