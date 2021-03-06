val_prev_count = 0;

function clear_filter(filter_bar) {
    filter_bar.val('');
    jQuery(".filterable").find('tr').each(function(e){
        jQuery(this).show()
    });
}


$(document).ready(function(e){
    $.expr[":"].contains = $.expr.createPseudo(function(arg) {
        return function( elem ) {
            return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
        };
    });
    jQuery('#clear_filter').click(function(e){
        clear_filter(jQuery('#searchInput'));
    });

    $('.search-panel .dropdown-menu').find('a').click(function(e) {
        e.preventDefault();
        $('.search-panel span#search_concept').text($(this).text());
        $('.input-group #search_param').val($(this).attr("href").replace("#",""));
    });
    $('#search_submit').click(function(){
        $('#search_form').submit()
    });
    $('#search_form').submit(function(e){
        jQuery(this).attr('action', '/search/' + jQuery('#search_query').val() + '/' + jQuery('#search_param').val())
    });
    $("#searchInput").keyup(function(){
        current_val = jQuery(this).val();
        if(current_val.length > 1 || current_val === '' || val_prev_count > current_val.length) {
            val_prev_count = current_val.length;
            //split the current value of searchInput
            var data = this.value.split(" ");
            //create a jquery object of the rows
            var jo = $(".filterable").find("tr");
            if (this.value === "") {
                jo.show();
                return;
            }
            jo.hide();
            jo.filter(function (i, v) {
                var $t = $(this);
                if($t.hasClass("not_filterable") === false) {
                    for (var d = 0; d < data.length; ++d) {
                        if ($t.is(":contains('" + data[d] + "')") ||
                            ($t.is('[x-secret-filter-data]') &&
                                $t.attr('x-secret-filter-data').toLowerCase().indexOf(data[d].toLowerCase()) !== -1 )) {
                            return true;
                        }
                    }
                }
                return false;
            }).show();
        }
    }).change(function () {
        current_val = jQuery(this).val();
        if(current_val.length > 1 || current_val === '' || val_prev_count > current_val.length) {
            val_prev_count = current_val.length;
            //split the current value of searchInput
            var data = this.value.split(" ");
            //create a jquery object of the rows
            var jo = $(".filterable").find("tr");
            if (this.value === "") {
                jo.show();
                return;
            }
            jo.hide();
            jo.filter(function (i, v) {
                var $t = $(this);
                if($t.hasClass("not_filterable") === false) {
                    for (var d = 0; d < data.length; ++d) {
                        if ($t.is(":contains('" + data[d] + "')") ||
                            ($t.hasAttr('x-secret-filter-data') &&
                                $t.attr('x-secret-filter-data').toLowerCase().indexOf(data[d].toLowerCase()) !== -1 )) {
                            return true;
                        }
                    }
                }
                return false;
            }).show();
        }
    }).focus(function () {
        this.value = "";
        $(this).css({
            "color": "black"
        });
        $(this).unbind('focus');
    }).css({
        "color": "#C0C0C0"
    });
});