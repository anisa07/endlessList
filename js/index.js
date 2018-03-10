Vue.component('quotation-item', {
    props: ['item'],
    template: '<li>' +
        '<div class="itemContainer">' +
            '<div class="row">' +
                '<div class="col-md-4">' +
                    '<div class="itemContainer__img"> ' +
                        '<div class="imgBorder"></div>' +
                        '<img src="img/typewriter.jpg" />' +
                    '</div>' +
                '</div>' +
                '<div class="col-md-8">' +
                    '<div class="itemContainer__text">' +
                        '<p class="quote">{{item.quote}}</p>' +
                        '<p class="author">{{item.author}}</p>' +
                        '<div class="textBorder"></div>'+
                    '</div>'+
                '</div>' +
            '</div>' +
        '</div></li>'
});

Vue.component('quotation-list', {
    props: ['list'],
    template: '<ul><quotation-item ' +
                    'v-for="item in list" ' +
                    'v-bind:item="item"' +
                    'v-bind:key="item.id">' +
                  '</quotation-item>' +
              '</ul>'
});

let data = {
    list: []
};

new Vue({
    el: '#start',
    data: data,
    created: function(){
        for (let i=0; i<10; i++){
            returnQuotList()
        }
    }
});

function returnQuotList(){
    let url = 'https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous';
    let fetchHeaders = new Headers();
    fetchHeaders.append("Accept", "application/json");
    fetchHeaders.append("X-Mashape-Key", "prF0fYDLELmshmUqXfY0tUU5fUSSp1H08b5jsni8d2xK8TfjPx");

    let fetchInit = {
        method: 'GET',
        headers: fetchHeaders
    };

    fetch(url,  fetchInit).then(function(response){
        return response.json()
    }). then(function(res){
        data.list.push(res);
        console.log(data.list)
    })
}

let drawDebouncedEvent = _.debounce(function(){
    returnQuotList();
}, 200);

let scrolled = 0;
window.onscroll = function() {
    let newScroll = window.pageYOffset || document.documentElement.scrollTop;
    if (scrolled > newScroll){
        console.log('up')
    } else {
        drawDebouncedEvent();
    }
    scrolled = newScroll;
};

