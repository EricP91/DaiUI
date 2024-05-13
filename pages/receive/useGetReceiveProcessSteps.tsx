import {
  VisibilityIcon,
  SignIcon,
  TransactionInformationIcon,
  MoveIcon,
  CheckedIcon,
  StepType,
} from '@cellebrite/design-system';
import {useTranslation} from 'react-i18next';

export const useGetReceiveProcessSteps = (): StepType[] => {
  const {t} = useTranslation();
  return [
    {
      title: t('evidence.receive.step1.title'),
      subtitle: t('evidence.receive.step1.subtitle'),
      content: t('evidence.receive.step1.content'),
      icon: <VisibilityIcon />,
    },
    {
      title: t('evidence.receive.step2.title'),
      subtitle: t('evidence.receive.step2.subtitle'),
      content: t('evidence.receive.step2.content'),
      icon: <SignIcon />,
    },
    {
      title: t('evidence.receive.step3.title'),
      subtitle: t('evidence.receive.step3.subtitle'),
      content: t('evidence.receive.step3.content'),
      icon: <TransactionInformationIcon />,
    },
    {
      title: t('evidence.receive.step4.title'),
      subtitle: t('evidence.receive.step4.subtitle'),
      content: t('evidence.receive.step4.content'),
      icon: <MoveIcon />,
    },
    {
      title: t('evidence.receive.step5.title'),
      subtitle: t('evidence.receive.step5.subtitle'),
      content: t('evidence.receive.step5.content'),
      icon: <CheckedIcon />,
    },
  ];
};
