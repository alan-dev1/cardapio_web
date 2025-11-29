// gerarHash123456.js - Gerar hash para a senha 123456
const bcrypt = require('bcryptjs');

async function gerarHash() {
    console.log('='.repeat(60));
    console.log('🔐 GERANDO HASH PARA SENHA: 123456');
    console.log('='.repeat(60));
    console.log();

    // Gerar hash para 123456
    const senha = '123456';
    const hash = await bcrypt.hash(senha, 10);
    
    console.log('✅ Hash gerado com sucesso!');
    console.log();
    console.log('📋 INFORMAÇÕES:');
    console.log('   Senha original: ' + senha);
    console.log('   Hash bcrypt:    ' + hash);
    console.log();
    
    console.log('='.repeat(60));
    console.log('📝 COMANDO SQL PARA COPIAR E EXECUTAR NO MYSQL:');
    console.log('='.repeat(60));
    console.log();
    console.log(`UPDATE usuarios SET senha = '${hash}' WHERE email = 'admin@cardapio.com';`);
    console.log();
    
    console.log('='.repeat(60));
    console.log('✅ APÓS EXECUTAR O UPDATE, FAÇA LOGIN COM:');
    console.log('='.repeat(60));
    console.log('   Email: admin@cardapio.com');
    console.log('   Senha: 123456');
    console.log('='.repeat(60));
    
    // Testar se o hash funciona
    console.log();
    console.log('🧪 TESTANDO O HASH...');
    const testeCorreto = await bcrypt.compare('123456', hash);
    const testeErrado = await bcrypt.compare('senhaerrada', hash);
    
    console.log('   bcrypt.compare("123456", hash) =', testeCorreto ? '✅ true' : '❌ false');
    console.log('   bcrypt.compare("senhaerrada", hash) =', testeErrado ? '✅ true' : '❌ false');
    console.log();
}

// Executar
gerarHash().catch(console.error);