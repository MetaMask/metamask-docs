import React from 'react';
import Layout from '@theme/Layout';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import styles from './faucet.module.scss'
import Button from '@site/src/components/Button'

export default function Faucet() {
    return (
        <Layout title="Faucet" description="Faucet">
            <div className={styles.authCont}>
                <span className={styles.title}>MetaMask Faucet</span>
                <Button>Sign in</Button>
            </div>
            <div className={styles.tabs}>
                <Tabs className={styles.header}>
                    <TabItem className={styles.content} value="apple" label="Ethereum Sepolia" default>
                        <div>Ethereum Sepolia</div>
                    </TabItem>
                    <TabItem className={styles.content} value="orange" label="Linea Sepolia">
                        <div>Linea Sepolia</div>
                    </TabItem>
                </Tabs>
            </div>
        </Layout>
    );
}