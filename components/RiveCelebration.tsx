import React, { forwardRef } from "react";
import Rive from "rive-react-native";

type Props = {
  isCelebrating: boolean;
  style?: any;
};

const CELEBRATION_URL = "https://public.rive.app/community/runtime-files/2195-4346-avatar-pack-use-case.riv";

const RiveCelebration = forwardRef<any, Props>(({ isCelebrating, style }, ref) => (
  isCelebrating ? (
    <Rive
      ref={ref}
      url={CELEBRATION_URL}
      artboardName="Avatar 1"
      stateMachineName="avatar"
      style={style}
    />
  ) : null
));

export default RiveCelebration;
