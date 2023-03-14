import { Box, IBoxProps, Modal, usePropsResolution, View } from "native-base";
import { IModalComponentType } from "native-base/lib/typescript/components/composites/Modal/types";
import React from "react";

/**
 * Modal.Body that uses a View wrapper instead of the ScrollView the default Native-base Model.Body does. 
 * 
 * Allows the use of FlatList inside of Modals without throwing warnings for
 * nested scroll views
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
