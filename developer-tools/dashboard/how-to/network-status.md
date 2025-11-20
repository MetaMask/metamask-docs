---[22/10 23:59] Davi Calixto: criar blockchain do zero Main net nome Calixto super token nativo Calixto fornecimento 10000000 valor 10 dólares endereço 0xD48915f5ba4D5a9A3013f9953bfab9C3354b4D59 class Blockchain: def __init__(self): self.chain = [self.create_genesis_block()] def create_genesis_block(self): return Block(0, "0", "Genesis Block") def add_block(self, data): previous_block = self.chain[-1] new_block = Block(len(self.chain), previous_block.hash, data) self.chain.append(new_block) # Exemplo de uso: blockchain = Blockchain() blockchain.add_block("Transação 1") blockchain.add_block("Transação 2") for block in blockchain.chain: print(f"Índice: {block.index}, Hash: {bloco.hash}") lançar main net.
[25/10 14:03] Davi Calixto: import hashlib
import time
from typing import List, Dict

class Block:
    def __init__(self, index: int, previous_hash: str, timestamp: float, transactions: List[Dict], nonce=0):
        self.index = index
        self.previous_hash = previous_hash
        self.timestamp = timestamp
        self.transactions = transactions
        self.nonce = nonce
        self.hash = self.calculate_hash()

    def calculate_hash(self):
        block_string = (
            str(self.index) +
            self.previous_hash +
            str(self.timestamp) +
            str(self.transactions) +
            str(self.nonce)
        )
        return hashlib.sha256(block_string.encode()).hexdigest()

    def mine_block(self, difficulty):
        target = '0' * difficulty
        while self.hash[:difficulty] != target:
            self.nonce += 1
            self.hash = self.calculate_hash()
        print(f"Block {self.index} mined with nonce {self.nonce} and hash {self.hash}")

class Transaction:
    def __init__(self, sender: str, recipient: str, amount: float):
        self.sender = sender
        self.recipient = recipient
        self.amount = amount

    def to_dict(self):
        return {
            'sender': self.sender,
            'recipient': self.recipient,
            'amount': self.amount
        }

class Blockchain:
    def __init__(self):
        self.difficulty = 4
        self.pending_transactions = []
        self.chain: List[Block] = [self.create_genesis_block()]
        self.balances = {}
        self.token_supply = 10_000_000
        self.native_address = "0xD48915f5ba4D5a9A3013f9953bfab9C3354b4D59"
        self.balances[self.native_address] = self.token_supply

    def create_genesis_block(self):
        genesis_block = Block(0, "0", time.time(), [{"info": "Genesis Block"}])
        genesis_block.hash = genesis_block.calculate_hash()
        return genesis_block

    def get_latest_block(self):
        return self.chain[-1]

    def create_transaction(self, sender: str, recipient: str, amount: float):
        if sender != "System" and self.balances.get(sender, 0) < amount:
            raise Exception(f"Saldo insuficiente para o endereço {sender}")
        tx = Transaction(sender, recipient, amount).to_dict()
        self.pending_transactions.append(tx)

    def mine_pending_transactions(self, miner_address):
        new_block = Block(
            len(self.chain),
            self.get_latest_block().hash,
            time.time(),
            self.pending_transactions
        )
        new_block.mine_block(self.difficulty)
        self.chain.append(new_block)
        self.update_balances(new_block.transactions)
        self.pending_transactions = []

    def update_balances(self, transactions):
        for tx in transactions:
            sender = tx['sender']
            recipient = tx['recipient']
            amount = tx['amount']

            if sender != "System":
                if self.balances.get(sender, 0) < amount:
                    raise Exception(f"Saldo insuficiente para o endereço {sender}")
                self.balances[sender] -= amount

            self.balances[recipient] = self.balances.get(recipient, 0) + amount

    def get_balance(self, address):
        return self.balances.get(address, 0)

    def is_chain_valid(self):
        for i in range(1, len(self.chain)):
            current = self.chain[i]
            previous = self.chain[i-1]
            if current.hash != current.calculate_hash():
                return False
            if current.previous_hash != previous.hash:
                return False
        return True

# Exemplo de uso:
if __name__ == "__main__":
    blockchain = Blockchain()
    print(f"Saldo inicial do endereço nativo ({blockchain.native_address}): {blockchain.get_balance(blockchain.native_address)}")

    # Criar transações
    blockchain.create_transaction(blockchain.native_address, "0xABCDEF1234567890ABCDEF1234567890ABCDEF12", 5000)
    blockchain.create_transaction(blockchain.native_address, "0xFEDCBA0987654321FEDCBA0987654321FEDCBA09", 15000)

    # Minerar bloco para confirmar transações
    blockchain.mine_pending_transactions(miner_address="0xMinerAddress000000000000000000000000000000")

    print(f"Saldo após transações:")
    print(f"{blockchain.native_address}: {blockchain.get_balance(blockchain.native_address)}")
    print(f"0xABCDEF1234567890ABCDEF1234567890ABCDEF12: {blockchain.get_balance('0xABCDEF1234567890ABCDEF1234567890ABCDEF12')}")
    print(f"0xFEDCBA0987654321FEDCBA0987654321FEDCBA09: {blockchain.get_balance('0xFEDCBA0987654321FEDCBA0987654321FEDCBA09')}")

    print("Blockchain válida?", blockchain.is_chain_valid())
[26/10 18:05] Davi Calixto: import hashlib
import time
import json
import requests
from urllib.parse import urlparse
from uuid import uuid4

# --- Classe para o Bloco (Bloco) ---
class Block:
    def __init__(self, index, previous_hash, timestamp, transactions, validator, nonce=0):
        self.index = index
        self.previous_hash = previous_hash
        self.timestamp = timestamp
        self.transactions = transactions
        self.validator = validator
        self.nonce = nonce
        self.hash = self.calculate_hash()

    def calculate_hash(self):
        block_string = json.dumps(self.__dict__, sort_keys=True)
        return hashlib.sha256(block_string.encode()).hexdigest()

# --- Classe para a Transação (Transacao) ---
class Transaction:
    def __init__(self, sender_address, recipient_address, amount, timestamp, signature=None):
        self.sender_address = sender_address
        self.recipient_address = recipient_address
        self.amount = amount
        self.timestamp = timestamp
        self.signature = signature

    def sign(self, private_key):
        # Aqui a lógica seria usar uma biblioteca de criptografia real, como a 'ecdsa'
        # Para este exemplo, vamos simplificar com um hash como "assinatura"
        tx_string = f"{self.sender_address}{self.recipient_address}{self.amount}{self.timestamp}"
        self.signature = hashlib.sha256(tx_string.encode() + private_key.encode()).hexdigest()

    def verify_signature(self, public_key):
        # A verificação real precisaria da chave pública do remetente
        # Para este exemplo, a lógica é simplificada
        tx_string = f"{self.sender_address}{self.recipient_address}{self.amount}{self.timestamp}"
        return hashlib.sha256(tx_string.encode() + public_key.encode()).hexdigest() == self.signature

# --- Classe para a Blockchain (Blockchain) ---
class Blockchain:
    def __init__(self, node_address):
        self.chain = []
        self.pending_transactions = []
        self.nodes = set()
        self.node_address = node_address
        self.staking_balances = {node_address: 1000}  # Saldo de staking inicial
        self.create_genesis_block()

    def create_genesis_block(self):
        # Transação de emissão do super token nativo Calixto
        genesis_transactions = [
            Transaction(
                sender_address="0x0",
                recipient_address="0xD48915f5ba4D5a9A3013f9953bfab9C3354b4D59",
                amount=10000000,
                timestamp=time.time()
            )
        ]
        genesis_block = Block(0, "0", time.time(), genesis_transactions, "Genesis", 0)
        self.chain.append(genesis_block)

    def add_block(self, block):
        # Adicionar o bloco à cadeia, após validações
        self.chain.append(block)

    def new_transaction(self, sender_address, recipient_address, amount, signature, public_key):
        transaction = Transaction(sender_address, recipient_address, amount, time.time(), signature)
        if transaction.verify_signature(public_key):
            self.pending_transactions.append(transaction)
            return True
        return False

    def get_balance(self, address):
        balance = 0
        for block in self.chain:
            for tx in block.transactions:
                if tx.recipient_address == address:
                    balance += tx.amount
                if tx.sender_address == address:
                    balance -= tx.amount
        return balance

    def add_node(self, address):
        parsed_url = urlparse(address)
        self.nodes.add(parsed_url.netloc)

    def resolve_conflicts(self):
        longest_chain = None
        current_length = len(self.chain)

        for node in self.nodes:
            response = requests.get(f'http://{node}/chain')
            if response.status_code == 200:
                length = response.json()['length']
                chain = response.json()['chain']
                if length > current_length and self.is_valid_chain(chain):
                    current_length = length
                    longest_chain = chain

        if longest_chain:
            self.chain = longest_chain
            return True
        return False

    def is_valid_chain(self, chain):
        previous_block = chain[0]
        block_index = 1
        while block_index < len(chain):
            block = chain[block_index]
            if block['previous_hash'] != previous_block['hash']:
                return False
            if not self.valid_proof_of_stake(previous_block, block):
                return False
            previous_block = block
            block_index += 1
        return True

    def valid_proof_of_stake(self, previous_block, block):
        # Valida que o bloco foi minerado por um validador válido
        # Lógica simplificada: o validador deve ter um saldo de staking
        return block['validator'] in self.staking_balances and self.staking_balances[block['validator']] > 0

    def get_validator_by_stake(self):
        # Lógica simplificada para PoS: elege o validador com maior stake
        return max(self.staking_balances, key=self.staking_balances.get)

# --- Exemplo de uso e simulação da rede P2P ---
if __name__ == '__main__':
    node_address = str(uuid4()).replace('-', '')

    # Criação da blockchain Calixto
    calixto_blockchain = Blockchain(node_address)

    # Simulação de carteiras (endereços e chaves)
    wallets = {
        '0xD48915f5ba4D5a9A3013f9953bfab9C3354b4D59': 'chave_privada_calixto',
        'carteira_A': 'chave_privada_A',
        'carteira_B': 'chave_privada_B'
    }

    # Adicionar saldo de staking a carteira A para permitir validação
    calixto_blockchain.staking_balances['carteira_A'] = 2000

    # Adicionar transações pendentes
    tx1 = Transaction('0xD48915f5ba4D5a9A3013f9953bfab9C3354b4D59', 'carteira_A', 500, time.time())
    tx1.sign(wallets['0xD48915f5ba4D5a9A3013f9953bfab9C3354b4D59'])
    calixto_blockchain.new_transaction(
        tx1.sender_address, tx1.recipient_address, tx1.amount, tx1.signature, wallets['0xD48915f5ba4D5a9A3013f9953bfab9C3354b4D59']
    )
    
    tx2 = Transaction('carteira_A', 'carteira_B', 100, time.time())
    tx2.sign(wallets['carteira_A'])
    calixto_blockchain.new_transaction(
        tx2.sender_address, tx2.recipient_address, tx2.amount, tx2.signature, wallets['carteira_A']
    )

    # Simular o processo de validação (PoS)
    print("Iniciando a validação de novos blocos...")
    validator = calixto_blockchain.get_validator_by_stake()
    print(f"O validador eleito para o próximo bloco é: {validator}")

    # Criação e adição do novo bloco
    last_block = calixto_blockchain.chain[-1]
    new_block_index = last_block.index + 1
    new_block = Block(
        index=new_block_index,
        previous_hash=last_block.hash,
        timestamp=time.time(),
        transactions=[tx1.__dict__, tx2.__dict__],
        validator=validator
    )
    calixto_blockchain.add_block(new_block)
    calixto_blockchain.pending_transactions = []  # Limpa as transações pendentes após o bloco ser criado

    # Exibir a blockchain completa
    print("\n--- Blockchain Calixto ---")
    for block in calixto_blockchain.chain:
        print(f"Índice: {block.index}")
        print(f"  Hash: {block.hash}")
        print(f"  Hash Anterior: {block.previous_hash}")
        print(f"  Transações: {block.transactions}")
        print(f"  Validador: {block.validator}")
        print("-----------------------")

    # Exibir saldos
    print(f"\nSaldo da carteira Calixto: {calixto_blockchain.get_balance('0xD48915f5ba4D5a9A3013f9953bfab9C3354b4D59')}")
    print(f"Saldo da carteira A: {calixto_blockchain.get_balance('carteira_A')}")
    print(f"Saldo da carteira B: {calixto_blockchain.get_balance('carteira_B')}")

    # Exibir saldos de staking
    print(f"\nSaldo de staking da carteira A: {calixto_blockchain.staking_balances['carteira_A']}")
[9/11 20:00] Davi Calixto: 0xeb3a9c56d963b971d320f889be2fb8b59853e449
[20/11 02:15] Davi Calixto: curl --url https://mainnet.infura.io/v3/de4b547e23ee488b9aaa794e48a8af05 \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}'
[20/11 02:15] Davi Calixto: RDa7fCe0MVEE2DgJ0aMTMJluJb/5WxZsaqWn1uwmR6T9qhsL6hHn9w
[20/11 02:18] Davi Calixto: 3161ec9b30294e32af2e275d9616eb58
description: View the network status
sidebar_position: 8
---

# View the network status

View the [Infura status page](https://status.infura.
io/) to check for service outages, incidents, and
scheduled maintenance notices. You can also subscribe to status updates via email, SMS, webhook, Slack, and Atom/RSS.

You can also select the **Status** link on the left of the MetaMask Developer dashboard to view the status page.

<p align="center">
  <img src={require("../../images/status-page.png").default} />
</p>
