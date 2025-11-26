mensagem_global = "eu sou uma variavel global"
def minha_funcao ():
    mensagem_local = "eu sou uma variavel local"
    print(mensagem_local)

minha_funcao()

print(mensagem_global)

minha_funcao()

def func():
    x = 2
    print(x)
x = 5
l = 10
func()
print(x)
print(l)

#constantes
PI = 3.14159
raio = 5
area = PI *(raio ** 2)
print("Area do circulo é:", area)

def imprimir_dados(numero, texto):
    print("numero:", numero)
    print("texto:", texto)

numero_fornecido = 60
texto_fornecido = "ola mundo"

imprimir_dados(numero_fornecido, texto_fornecido)

calculo = 2+3-4**2+5/2-5//2
print("resultado do calculo é:", calculo)

def calcular_expressao():
    expressao = input("Digite uma expressao matematica: ")
    try:
        resuldado = eval(expressao)
        print("O resultado da expressao é:", resuldado)
    except Exception as e:
        print("Erro ao calcular a expressao:", e)

calcular_expressao()