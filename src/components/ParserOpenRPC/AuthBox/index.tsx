import React from "react";
import clsx from "clsx";
import Button from '@site/src/components/elements/buttons/button'
import styles from './styles.module.scss'
import { trackClickForSegment } from "@site/src/lib/segmentAnalytics";

interface AuthBoxProps {
  handleConnect: () => void
  theme: string
}

export const AuthBox = ({ handleConnect, theme }: AuthBoxProps) => {
  const connectHandler = () => {
    trackClickForSegment({
      eventName: "Connect wallet",
      clickType: "Connect wallet",
      userExperience: "B",
    });
    handleConnect();
  }
  return (
    <div className={styles.msgWrapper}>
        <p className={clsx(styles.msgText, 'type-paragraph-m')}>
            Connect MetaMask to test requests using your wallet
        </p>
        <Button
            as="button"
            label={'Connect MetaMask'}
            onClick={connectHandler}
            data-test-id="connect-metamask"
            style={
                theme === 'dark'
                    ? {
                        '--button-color': 'var(--consumer-orange)',
                        '--button-text-color': 'var(--general-black)',
                        '--button-color-hover': 'var(--general-white)',
                        '--button-text-color-hover': 'var(--general-black)',
                    }
                    : {
                        '--button-color': 'var(--consumer-orange)',
                        '--button-text-color': 'var(--general-black)',
                        '--button-color-hover': 'var(--general-black)',
                        '--button-text-color-hover': 'var(--general-white)',
                    }
            }
        />
    </div>
  );
};
