$(document).ready(() => {
  $('#searchForm').on('submit', (e) =>{
    let searchText = $('#search').val().toLowerCase();
    $('.feed').empty();
      e.preventDefault();
      console.log(searchText)
      validateIndex(searchText);
  });

  function validateIndex(searchText){
    let index = searchText;
    console.log(index);
    switch (index){
      case 'ethereum':
      case 'eth':
      index = 'ETH';
      getQuotes(index);
      getArticles(index);
      break;
      case 'ripple':
      case 'xrp':
      index = 'XRP';
      getArticles(index);
      getQuotes(index);
      break;
      case 'bitcoin':
      case 'btc':
      index = 'BTC';
      getArticles(index);
      getQuotes(index);
      break;
      case 'factom':
      case 'ftc':
      index = 'FTC';
      getArticles(index);
      getQuotes(index);
      break;
      case 'dash':
      index = 'DASH';
      getArticles(index);
      getQuotes(index);
      break;
      case 'qtum':
      index = 'QTUM';
      getArticles(index);
      getQuotes(index);
      break;
      case 'litecoin':
      case 'ltc':
      index = 'LTC';
      getArticles(index);
      getQuotes(index);
      break;
      case 'cardano':
      case 'ada':
      index = 'ADA';
      getArticles(index);
      getQuotes(index);
      break;
      case 'bitcoin cash':
      case 'bch':
      index = 'BCH';
      getArticles(index);
      getQuotes(index);
      break;
      default:
      console.log("Not found");
    }
  }


  function getArticles(index){
    $.ajax({
      url: 'https://newsapi.org/v2/everything?q='+index,
      data: {
        pageSize: 8,
        sortBy: 'publishedAt',
        language: "en",
        sources: 'crypto-coins-news, engadget, techcrunch, the-verge',
        apikey: '4f8bd17701bb4e4aa8658ee475c35b3b'
      }

    }).done(function(response){
      console.log(response);
      let info = response.articles;

      $.each(info, (index, item)=>{
        let author = item.author;
        let desc = item.description;
        let title = item.title;
        let link = item.url;
        let image = item.urlToImage;
        renderArticles(author, desc, title, link, image)
      })
    })
  }

   function getQuotes(index){
     $.ajax({
         url:'https://min-api.cryptocompare.com/data/histominute?',
         data: {
          fsym: index,
          tsym: 'USD',
          limit: 20,
          tryConversion: 'true',
          aggregate:3,
          e:  'CCCAGG'}
      }).done(function(curr){
            let cryptoTime = curr.Data.map(item=> item.time).map(time=>(new Date(time *1000)).toLocaleString());
            let cryptoClose = curr.Data.map(item=>item.close);
            console.log(cryptoTime);
            console.log(cryptoClose);
            createChart(cryptoTime, cryptoClose);
    });
  }
    function renderArticles(author, desc, title, link, image){
      $('.feed').append(`
        <div>
            <div class = "article">
               <img src = "${image}" width="100" height="100">
              <h5>${title}</h5>
              <h5>${author}</h5>
              <h5>${desc}<h5>
              <a href="${link}" class="buttonArt">VIEW</a>
            </div>
        </div>
        `)
    }

    function createChart(cryptoTime, cryptoClose){
      const CHART = $('#lineChart');
      let lineChart = new Chart(CHART, {
        type:'line',
        backgroundColor: '#00A8A8',
        data:{
          labels: cryptoTime,
          datasets: [{
            data: cryptoClose,
            backgroundColor:  '#1fe052'
          }]
        }
      })
    }













});
