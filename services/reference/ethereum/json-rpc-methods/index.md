// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Interface mínima do ERC20 para interagir com o USDT
interface IERC20 {
    function balanceOf(address account) external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
}

contract ReceptorUSDT {
    address public owner;
    IERC20 public usdtToken;

    // Endereço principal do USDT na rede Ethereum (Mainnet)
    address constant USDT_ADDRESS = 0xdAC17F958D2ee523a2206206994597C13D831ec7;

    constructor() {
        owner = msg.sender;
        usdtToken = IERC20(USDT_ADDRESS);
    }

    // Função para transferir USDT de quem chama para este contrato
    function depositarUSDT(uint256 _amount) public {
        require(_amount > 0, "Quantidade deve ser maior que zero");
        // O usuário deve aprovar o contrato antes de chamar isso (allowance)
        require(usdtToken.transferFrom(msg.sender, address(this), _amount), "Falha na transferencia");
    }

    // Função para o dono retirar USDT do contrato
    function sacarUSDT(uint256 _amount) public {
        require(msg.sender == owner, "Apenas o dono pode sacar");
        require(usdtToken.transfer(owner, _amount), "Falha no saque");
    }

    // Verificar saldo de USDT do contrato
    function saldoDoContrato() public view returns (uint256) {
        return usdtToken.balanceOf(address(this));
    }
}
