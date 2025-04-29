import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold">Meu Projeto</h1>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <Link href="/login">
              <Button variant="outline">Entrar</Button>
            </Link>
            <Link href="/register">
              <Button>Registrar</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Bem-vindo ao Meu Projeto
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                  Um sistema completo com autenticação e dashboard para gerenciar seus dados.
                </p>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Link href="/register">
                  <Button size="lg">Começar Agora</Button>
                </Link>
                <Link href="/login">
                  <Button variant="outline" size="lg">
                    Já tenho uma conta
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t">
        <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-gray-500">© 2024 Meu Projeto. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  )
}
