var app = new Vue ({
  el: '#app',
  data: {
    token: 'admin',
    tokenu: 0,
    menu: [],
    orders: [],
    order: [],
    newStatus: '',
    newOrder: {
      products: '',
      price: '',
      user: ''
    },
    profit: ''
  },
  methods: {
    loadMenu: function () {
      fetch('http://localhost:3001/restaurant/menu')
        .then(response => response.json())
        .then(response => {
          this.menu = response
          console.log('response:', response)
        })
    },
    loadOrders: function () {
      fetch('http://localhost:3001/restaurant/orders')
        .then(response => response.json())
        .then(response => {
          this.orders = response
          console.log('response:', response)
        })
    },
    loadOrdersByUser: function (id) {
      this.$http.get(`http://localhost:3001/restaurant/orders/${id}?token=${this.token}`)
        .then(response => response.json())
        .then(response => {
          console.log('response:', response)
          this.order = response
        })
    },
    deleteOrder: function (id) {
      this.$http.delete(`http://localhost:3001/restaurant/${id}?token=${this.token}`)
        .then(response => response.json())
        .then(response => {
          console.log('response:', response)
          this.orders = response
          this.loadOrders()
        })
    },
    changeStatus: function (id) {
      this.$http.put(`http://localhost:3001/restaurant/${id}?token=${this.token}`, {newStatus: this.newStatus})
        .then(response => response.json())
        .then(response => {
          console.log('response:', response)
          this.loadOrders()
          this.newStatus = ''
        })
    },
    addOrder: function () {
      this.$http.post(`http://localhost:3001/users?token=${this.tokenu}`, this.newOrder)
        .then(response => response.json())
        .then(response => {
          console.log('response:', response)
          this.newOrder.products = ''
          this.newOrder.price = ''
          this.newOrder.user = ''
          this.loadOrders()
        })
    },
    getProfit: function () {
      this.$http.get(`http://localhost:3001/restaurant/?token=${this.token}`)
        .then(response => response.json())
        .then(response => {
          console.log('response:', response)
          this.profit = response
        })
    }
  }
})
