$(document).ready(() => {

  $('#searchForm').on('submit', (e) =>{
    window.location.href="home.html?search=" + $('#search').val();

      e.preventDefault();

  });
});
