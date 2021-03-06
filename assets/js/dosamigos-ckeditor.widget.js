/**
 * @copyright Copyright (c) 2014 2amigOS! Consulting Group LLC
 * @link http://2amigos.us
 * @license http://www.opensource.org/licenses/bsd-license.php New BSD License
 */
if (typeof dosamigos == "undefined" || !dosamigos) {
    var dosamigos = {};
}

dosamigos.ckEditorWidget = (function ($) {

    var pub = {
        registerOnChangeHandler: function (id) {
            CKEDITOR && CKEDITOR.instances[id] && CKEDITOR.instances[id].on('change', function () {
                CKEDITOR.instances[id].updateElement();
                $('#' + id).trigger('change');
                return false;
            });
        },
        registerCsrfImageUploadHandler: function () {
            yii & $(document).off('click', '.ck_dialog_tabs a:eq(2)').on('click', 'ck_dialog_tabs a:eq(2)', function () {
                var $form = $('.cke_dialog_ui_input_file iframe').contents().find('form');
                if (!$form.find('input[name=_csrf]').length) {
                    var csrfTokenInput = $('<input/>').attr({'type': 'hidden', 'name': yii.getCsrfParam()}).val(yii.getCsrfToken());
                    $form.append(csrfTokenInput);
                }
            });
        }
    };
    return pub;
})(jQuery);