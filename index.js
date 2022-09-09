

new Vue({
    el: '#list',
    data: {
        list_el: [
            {
                show: true,
                selected: false,
                name: 'Размещение новостей на сайте',
                status: 'Выполнено',
                date: '22.04.2022',
                colorst: ''
            },
            {
                show: true,
                selected: false,
                name: 'Внедрить Wi-fi для читателей',
                status: 'В работе',
                date: '25.03.2022',
                colorst: ''
            },
            {
                show: true,
                selected: false,
                name: 'Отредактировать раздел “Доступная среда”',
                status: 'Выполнено',
                date: '15.03.2022',
                colorst: ''
            },
            {
                show: true,
                selected: false,
                name: 'Презентация “Информационные технологии”',
                status: 'В работе',
                date: '15.03.2022',
                colorst: ''
            },
            {
                show: true,
                selected: false,
                name: 'Счётчики — внедрить дизайн',
                status: 'В работе',
                date: '09.03.2022'
            },
            {
                show: true,
                selected: false,
                name: 'Сверстать новый layout',
                status: 'В работе',
                date: '07.03.2022'
            },
            {
                show: true,
                selected: false,
                name: 'Скролл в новостях',
                status: 'Выполнено',
                date: '01.03.2022'
            },
            {
                show: true,
                selected: false,
                name: 'Форма сброса пароля',
                status: 'В работе',
                date: '25.02.2022'
            },
            {
                show: true,
                selected: false,
                name: 'Внедрение модуля Chat',
                status: 'Выполнено',
                date: '20.02.2022'
            }
        ],
        sort: '',
        form_visible: false,
        new_name: '',
        client: '',
        blur_per: '',
        pred: false
    },
    mounted() {
        if(localStorage.list_el){
            this.list_el = JSON.parse(localStorage.getItem("list_el") || "[]");
        }
        if(localStorage.sort){
            this.sort = localStorage.getItem("sort");
        }
    },
    watch:{
        list_el(newlistel){
            localStorage.setItem("list_el", JSON.stringify(newlistel))
        },
        sort(newsort){
            localStorage.setItem("sort", this.sort)
        }
    },
    methods: {

        colorst(par) {
            let class_stat = ''
            if (par == 'В работе') class_stat = 'rab'
            else class_stat = 'vup'
            return class_stat
        },
        checked_box() {
            for (let item of this.list_el)
                if (item.status == 'Выполнено') item.selected = true
                else item.selected = false
        },
        searching(text) {
            let srch = new RegExp(text)
            for (let item of this.list_el) {
                if (srch.test(item.name.toLowerCase()) || srch.test(item.status.toLowerCase()) || srch.test(item.date.toLowerCase()))
                    item.show = true
                else item.show = false
            }
        },
        change() {
            for (let item of this.list_el)
                if (item.selected == true) item.status = "Выполнено"
                else item.status = "В работе"
        },
        add() {
            if (this.new_name != null && this.new_name != '') {
                this.pred = false
                this.blur_per = ''
                let new_date = new Date()
                day = new_date.getDate()
                if (String(day).length == 1) day = "0" + day
                let month = new_date.getMonth() + 1
                if (String(month).length == 1) month = "0" + month
                let data = day + "." + month + "." + new_date.getFullYear()
                new_zapis = {
                    show: true,
                    selected: false,
                    name: this.new_name,
                    status: "В работе",
                    date: data
                }
                this.list_el.unshift(new_zapis)
                this.form_visible = false
                this.new_name = ''
            }
            else {
                this.blur_per = 'blur'
                this.pred = true}
        },
        sortir() {
            let arr_sort = []
            let arr_finish = []
            let arr_dop = []
            let obj = {}
            for (let item of this.list_el) {
                obj = {
                    date: item.date,
                    name: item.name
                }
                arr_dop.push(obj);
            }
            switch (this.sort) {
                case ("Дате"):
                    for (let i = 0; i<this.list_el.length; i++)
                    arr_sort.push(this.list_el[i].date);
                    arr_sort = arr_sort.sort()
                    for (let i = 0; i < arr_sort.length; i++)
                        for (let j = 0; j<this.list_el.length; j++)
                            if (arr_sort[i] == this.list_el[j].date){
                                arr_finish.push(this.list_el[j])
                                this.list_el.splice(j, 1)
                            }
                    this.list_el = []
                    this.list_el = arr_finish
                    break;



                case ("Статусу"):
                    for (let i = 0; i<this.list_el.length; i++)
                        if (this.list_el[i].status == 'В работе')
                            arr_finish.push(this.list_el[i])
                    for (let j = 0; j<this.list_el.length; j++)
                        if (this.list_el[j].status == 'Выполнено')
                            arr_finish.push(this.list_el[j])
                    this.list_el = []
                    this.list_el = arr_finish
                    break;


                case ("Описанию"): for (let i = 0; i<this.list_el.length; i++)
                    arr_sort.push(this.list_el[i].name);
                    arr_sort = arr_sort.sort()
                    for (let i = 0; i < arr_sort.length; i++)
                        for (let j = 0; j<this.list_el.length; j++)
                            if (arr_sort[i] == this.list_el[j].name){
                                arr_finish.push(this.list_el[j])
                                this.list_el.splice(j, 1)
                            }
                    this.list_el = []
                    this.list_el = arr_finish
                    break;
            }
        }
    }
})
