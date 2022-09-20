const formDOM = document.getElementById('auth-form')
const emailDOM = document.getElementById('exampleInputEmail1')
const passwordDOM = document.getElementById('exampleInputPassword1')
const alertDOM = document.getElementById('alert')

const dashboardDOM = document.getElementById('dashboard-form')
const tokenDOM = document.getElementById('token')
const dataDOM = document.getElementById('data')

formDOM.addEventListener('submit', async (e) => {
    alertDOM.classList.add('d-none')
    e.preventDefault()

    const email = emailDOM.value
    const password = passwordDOM.value

    try {
        const { data } = await axios.post('/api/v1/login', { email, password })
        
        emailDOM.value = ''
        passwordDOM.value = ''
        dataDOM.innerHTML = ''

        localStorage.setItem('token', data.token)
        tokenDOM.textContent = 'token present'
        tokenDOM.classList.remove('text-danger')
        tokenDOM.classList.add('text-success')

    } catch (error) {
        alertDOM.classList.remove('d-none')
        alertDOM.textContent = error.response.data.msg
        localStorage.removeItem('token')
        dataDOM.innerHTML = ''
        tokenDOM.textContent = 'no token present'
        tokenDOM.classList.remove('text-success')
        tokenDOM.classList.add('text-danger')
    }
})

dashboardDOM.addEventListener('submit', async (e) => {
    e.preventDefault()

    const token = localStorage.getItem('token')
    try {
        const { data } = await axios.get('/api/v1/dashboard', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        })
        dataDOM.innerHTML = `<h5>${data.msg}</h5><p>${data.secret}</p>`
    } catch (error) {
        localStorage.removeItem('token')
        dataDOM.innerHTML = `<p>${error.response.data.msg}</p>`
    }
})

const checkToken = () => {
    tokenDOM.classList.remove('text-success')
  
    const token = localStorage.getItem('token')
    if (token) {
      tokenDOM.textContent = 'token present'
      tokenDOM.classList.remove('text-danger')
      tokenDOM.classList.add('text-success')
    }
  }
checkToken()