import { boot } from 'quasar/wrappers'

let config = {}

export default boot(async ({ app }) => {
  try {
    const response = await fetch('/src/assets/phones.json')
    config = await response.json()
  } catch (error) {
    console.error('Erro ao carregar o arquivo de configuração:', error)
  }

  app.config.globalProperties.$config = config
})

export { config }
