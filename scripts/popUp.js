$(function(){
    var overlay = $('<div id="overlay"></div>');
    overlay.show();
    overlay.appendTo(document.body);
    $('.popup').show();
    $('.go').click(function(){
        $('.popup').hide();
        overlay.appendTo(document.body).remove();
        window.open("http://datenportal.ianus-fdz.de/pages/collectionView.jsp?dipId=1912845#collectionFiles");
        return false;
        });
    $('.close').click(function(){
    $('.popup').hide();
    overlay.appendTo(document.body).remove();
    return false;
    });
    

    $('.x').click(function(){
        $('.popup').hide();
        overlay.appendTo(document.body).remove();
        return false;
        });
});
    