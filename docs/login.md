o endpoint é:  https://laudok.com.br/PELIP_API/CreateUser

voce vai passar um objeto assim:

public class PelipCreateUserDto
{
    public string Email { get; set; }
    public string UserName { get; set; }
}

e vai te retornar isso aqui:
return Ok(new { Success = true, UserId = user.Id, Email = user.Email, UserName = user.UserName, CallbackUrl = callbackUrl });

[19:10, 18/11/2025] Gordo: o atributo é esse: CreateUser-Key
[19:10, 18/11/2025] Gordo: e o valor que voce vai passar é esse: keyTesteParaTestarAcessoAAPIDeOutroAPP