import React from "react";
import Accordion, {AccordionHeader, AccordionBody} from "@site/src/components/Accordion";

interface IFaq {
    network: 'linea' | 'sepolia';
    className: string;
}

export default function Faq({network, className}: IFaq) {
    switch (network) {
        case 'linea':
            return <div className={className}>
                <Accordion>
                    <AccordionHeader>
                        Why must my address have Ethereum Mainnet activity to claim Linea ETH?
                    </AccordionHeader>
                    <AccordionBody>
                        We require an address with Ethereum Mainnet activity to safeguard the faucet from
                        automated bots, ensuring equitable Linea ETH distribution. The amount of Linea ETH
                        you can receive ranges from 0 to 0.5, depending on your address’s level of activity.
                        No activity results in no Linea ETH. while a higher number of transactions can earn
                        you up to 0.5. We maintain confidentiality over the exact criteria used to determine
                        the amount issued to prevent any exploitation of the system, aiming to distribute
                        testnet ETH fairly among genuine, active users.
                    </AccordionBody>
                </Accordion>
                <Accordion>
                    <AccordionHeader>
                        I’m new to Web3. What is a faucet?
                    </AccordionHeader>
                    <AccordionBody>
                        A faucet is a platform that gives you test tokens to use when testing your smart
                        contracts. In this case, our faucet is giving you Sepolia ETH to test deploying
                        smart contracts and sending transactions before deploying your dapp in production on
                        Mainnet.
                    </AccordionBody>
                </Accordion>
                <Accordion>
                    <AccordionHeader>
                        What is Infura?
                    </AccordionHeader>
                    <AccordionBody>
                        Infura is the world’s most powerful suite of high availability blockchain APIs and
                        developer tools. Infura brings together everything you need to start building on
                        Web3, with infinitely scalable systems and exceptional documentation.
                    </AccordionBody>
                </Accordion>
                <Accordion>
                    <AccordionHeader>
                        What is Linea?
                    </AccordionHeader>
                    <AccordionBody>
                        <a target="_blank" href='https://linea.build'>Linea</a> is a type 2 zero knowledge
                        Ethereum Virtual
                        Machine (zkEVM). A zkEVM
                        replicates the Ethereum environment as a rollup and allows developers to build on it
                        as they would on Ethereum mainnet. Linea allows you to deploy any smart contract,
                        use any tool, and develop as if you’re building on Ethereum. For users, this enables
                        experience and security guarantees of Ethereum, but with lower transaction costs and
                        at greater speed.
                    </AccordionBody>
                </Accordion>
                <Accordion>
                    <AccordionHeader>
                        How can I get help with using this faucet?
                    </AccordionHeader>
                    <AccordionBody>
                        <a target="_blank" href='https://www.infura.io/contact'>Contact us</a> with any
                        issues or questions
                        you have relating the faucet.
                    </AccordionBody>
                </Accordion>
                <Accordion>
                    <AccordionHeader>
                        How can I help make this faucet better?
                    </AccordionHeader>
                    <AccordionBody>
                        Have ideas on how to improve the faucet? Awesome! We’d love to hear them. Submit
                        them <a target="_blank" href='https://discord.com/invite/consensys'>here.</a>
                    </AccordionBody>
                </Accordion>
                <Accordion>
                    <AccordionHeader>
                        Where does Linea ETH come from?
                    </AccordionHeader>
                    <AccordionBody>
                        Linea ETH were intially Goerli ETH that were bridged to Linea using the canonical <a
                        target="_blank" href='https://docs.linea.build/use-linea/bridge-funds'>bridge.</a>
                    </AccordionBody>
                </Accordion>
            </div>
        case 'sepolia':
            return <div className={className}>
                <Accordion>
                    <AccordionHeader>
                        Why must my address have Ethereum Mainnet activity to claim Sepolia ETH?
                    </AccordionHeader>
                    <AccordionBody>
                        We require an address with Ethereum Mainnet activity to safeguard the faucet from automated
                        bots, ensuring equitable Sepolia ETH distribution. The amount of Sepolia ETH you can receive
                        ranges from 0 to 0.5, depending on your address’s level of activity. No activity results in no
                        Sepolia ETH. while a higher number of transactions can earn you up to 0.5. We maintain
                        confidentiality over the exact criteria used to determine the amount issued to prevent any
                        exploitation of the system, aiming to distribute testnet ETH fairly among genuine, active users.
                    </AccordionBody>
                </Accordion>
                <Accordion>
                    <AccordionHeader>
                        I’m new to Web3. What is a faucet?
                    </AccordionHeader>
                    <AccordionBody>
                        A faucet is a platform that gives you test tokens to use when testing your smart contracts. In
                        this case, our faucet is giving you Sepolia ETH to test deploying smart contracts and sending
                        transactions before deploying your dapp in production on Mainnet.
                    </AccordionBody>
                </Accordion>
                <Accordion>
                    <AccordionHeader>
                        What is Infura?
                    </AccordionHeader>
                    <AccordionBody>
                        Infura is the world’s most powerful suite of high availability blockchain APIs and developer
                        tools. Infura brings together everything you need to start building on Web3, with infinitely
                        scalable systems and exceptional documentation.
                    </AccordionBody>
                </Accordion>
                <Accordion>
                    <AccordionHeader>
                        How can I get help with using this faucet?
                    </AccordionHeader>
                    <AccordionBody>
                        <a target="_blank" href='https://www.infura.io/contact'>Contact us</a> with any
                        issues or questions
                        you have relating the faucet.
                    </AccordionBody>
                </Accordion>
                <Accordion>
                    <AccordionHeader>
                        How can I help make this faucet better?
                    </AccordionHeader>
                    <AccordionBody>
                        Have ideas on how to improve the faucet? Awesome! We’d love to hear them. Submit
                        them <a target="_blank" href='https://discord.com/invite/consensys'>here.</a>
                    </AccordionBody>
                </Accordion>
                <Accordion>
                    <AccordionHeader>
                        Where does Sepolia ETH come from?
                    </AccordionHeader>
                    <AccordionBody>
                        The Sepolia ETH comes from our partnership with the Ethereum Foundation. We collaborate with
                        them to support the development community by maintaining an always on and reliable faucet
                        enviroment for the community.
                    </AccordionBody>
                </Accordion>
            </div>
    }
}