/**
 * Created by Sugar on 2016/9/18.
 */
$('.btn').on('click', function () {
   $('.dialog-wrap').addClass('active');
});

$('.dialog-ft .ft-btn').on('click', function () {
   $(this).parents('.dialog-wrap').removeClass('active');
});