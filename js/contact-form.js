//contact form js
(function($) {
    'use strict';


        // validations start here
        $('#contact_form').validate({

            rules: {

                first-name: {
                    required: true
                },
                last-name: {
                    required: true
                },
                phone: {
                    required: true
                },
                message: {
                    required: true
                },
                email: {
                    required: true,
                    email: true
                }
            },

            messages: {

                first-name: {
                    required: 'First name must be filled out.'
                },
                last-name: {
                    required: 'Last name must be filled out.'
                },
                phone: {
                    required: 'Phone must be filled out.'
                },
                message: {
                    required: 'Message must be filled out.'
                },

                email: {
                    required: 'Email must be filled out.',
                    email: 'Your email must be valid.'
                }
            },

            submitHandler: function() {

                var first-name = $('#first-name').val();
                var last-name = $('#last-name').val();
                var phone = $('#phone').val();
                var message = $('#message').val();
                var email = $('#email').val();

                var xurl = 'php/send_email.php?action=sendEmail&email=' + email + '&first-name=' + first-name + '&last-name=' + last-name + '&phone=' + phone + '&message=' + message;

                $('#btn_sent').val('Sending...');
                $('#error_message').html('');
                $('#btn_sent').attr('disabled', true);

                $.ajax({
                    type: 'POST',
                    url: xurl,
                    dataType: 'json',
                    success: function(result) {
                        $('#btn_sent').prop('disabled', false);
                        $('#btn_sent').val('Send enquiry');
                        if (result.response == 'success') {
                            $('#contact_form')[0].reset();
                            $('#error_message').html(result.message);
                            $('#error_message').addClass('contact-confirmation');
                            var selectedEffect = 'blind';

                            var options = {};

                            $('#error_message').hide(selectedEffect, options, 2000);
                            return false;
                        } else if (result.response == 'error') {
                            $('#error_message').html(result.message);
                            $('#error_message').addClass('contact-confirmation');
                        }
                    }
                });
            }
        });
}(jQuery));