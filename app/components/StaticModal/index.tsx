import { Box, IBoxProps, Modal, usePropsResolution, View } from "native-base";
import React from "react";
import { IModalComponentType } from "native-base/lib/typescript/components/composites/Modal/types";

/**
 * Modal.Body that uses a View wrapper instead of the ScrollView the default
 * Native-base Model.Body does. 
 * 
 * Allows the use of FlatList as Model.Body content
 * 
 * @returns 
 */
const StaticModalBody = ({ children, ...props }: IBoxProps) => {
  const { _view, ...resolvedProps } = usePropsResolution("ModalBody", props);

  return (
    <View {..._view}>
      <Box {...resolvedProps}>{children}</Box>
    </View>
  );
};

const ModalTemp: any = Modal;

ModalTemp.Body = StaticModalBody;

const ModalMain = ModalTemp as IModalComponentType;

export { ModalMain as StaticModal };
