import { type FC } from 'react';

type GeneralInfoProps = {
  updateState: React.Dispatch<React.SetStateAction<string>>;
};

const GeneralInfo: FC<GeneralInfoProps> = ({ updateState }) => {
  return <>general info</>;
};

export default GeneralInfo;
