"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { auth } from '../../backend/firebase'
import { onAuthStateChanged } from "firebase/auth"

export default function DashboardPage() {
  const router = useRouter()
  const [userName, setUserName] = useState("Usuário")

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace("/login")
      }
    })
    return () => unsubscribe()
  }, [router])

  const handleLogout = () => {
    // Aqui você implementaria a lógica real de logout
    router.push("/")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <h1 className="text-xl font-bold">Dashboard</h1>
          <div className="flex items-center gap-4">
            <span>Olá, {userName}</span>
            <Button variant="outline" onClick={handleLogout}>
              Sair
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 p-6">
        <div className="container mx-auto">
          <div className="rounded-lg border p-8 shadow-sm">
            <h2 className="text-2xl font-bold mb-4">Bem-vindo ao seu Dashboard</h2>
            <p className="text-gray-500 mb-6">
              Este é um dashboard em branco onde você pode adicionar seus próprios componentes e funcionalidades.
            </p>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-lg border p-4 shadow-sm">
                <h3 className="font-medium mb-2">Estatísticas</h3>
                <p className="text-sm text-gray-500">Visualize suas estatísticas e métricas aqui.</p>
              </div>
              <div className="rounded-lg border p-4 shadow-sm">
                <h3 className="font-medium mb-2">Atividades Recentes</h3>
                <p className="text-sm text-gray-500">Acompanhe suas atividades mais recentes.</p>
              </div>
              <div className="rounded-lg border p-4 shadow-sm">
                <h3 className="font-medium mb-2">Configurações</h3>
                <p className="text-sm text-gray-500">Gerencie suas preferências e configurações.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="border-t">
        <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-gray-500">© 2024 Meu Projeto. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  )
}
