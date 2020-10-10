$(document).ready(function () {

    $(document).on('switchChange.bootstrapSwitch', '.change_activation', function (event, state) {
        // ... skipped ...
        var user_id = $(this).data('id');
        $.ajax({
            url: baseURL + '/users/user-status',
            type: 'PUT',
            dataType: 'json',
            data: {'_token': csrf_token, 'user_id': user_id},
            success: function (data) {

                if (data.status) {
                    toastr['success'](data.message, '');
                } else {
                    toastr['error'](data.message);
                }

            }
        });

    });
    $('#providers_tbl').on('switchChange.bootstrapSwitch', '.is_active', function (event, state) {
        // ... skipped ...
        var user_id = $(this).data('id');
        $.ajax({
            url: baseURL + '/users/user-status',
            type: 'PUT',
            dataType: 'json',
            data: {'_token': csrf_token, 'user_id': user_id},
            success: function (data) {

                if (data.status) {
                    toastr['success'](data.message, '');
                } else {
                    toastr['error'](data.message);
                }

            }
        });

    });

    $('#providers_tbl').on('switchChange.bootstrapSwitch', '.verify', function (event, state) {
        // ... skipped ...
        var user_id = $(this).data('id');

        $.ajax({
            url: baseURL + '/users/user-verify',
            type: 'PUT',
            dataType: 'json',
            data: {'_token': csrf_token, 'user_id': user_id},
            success: function (data) {

                if (data.status) {
                    toastr['success'](data.message, '');
                } else {
                    toastr['error'](data.message);
                }

            }
        });

    });

    if ($("#providers_tbl").length) {

        var providers_tbl = $("#providers_tbl");
        providers_tbl.on('preXhr.dt', function (e, settings, data) {
            //.name,.title,.server,.searcher.,.status
            // data.name = $('.name').val();
            data.name = $('#name').val();
            data.email = $('#email').val();
            data.phone = $('#phone').val();
            data.is_active = $('#is_active').val();
            data.is_verify = $('#is_verify').val();
        }).dataTable({
            "processing": true,
            "serverSide": true,

            "ajax": {
                url: baseURL + "/users/user-data/service_provider"
                // success: function (response) {
                //
                //     if (!response.status) {
                //         $('#providers_tbl_processing').hide();
                //         bootbox.alert(response.message);
                //
                //     }
                // }
                , "dataSrc": function (json) {
                    //Make your callback here.
                    if (json.status != undefined && !json.status) {
                        $('#providers_tbl_processing').hide();
                        bootbox.alert(json.message);
                        //
                    } else
                        return json.data;
                }
            },

            columns: [
                {data: 'DT_RowIndex', name: 'DT_RowIndex'},
                {data: 'photo', name: 'photo'},
                {data: 'name', name: 'name'},
                {data: 'gender', name: 'gender'},
                {data: 'email', name: 'email'},
                // {data: 'email_verified_at', name: 'email_verified_at'},
                {data: 'phone', name: 'phone'},
                {data: 'is_verify', name: 'is_verify'},
                {data: 'city.name', name: 'city.name'},
                {data: 'is_active', name: 'is_active'},
                {data: 'action', name: 'action'}
            ],
            "fnDrawCallback": function () {
                //Initialize checkbos for enable/disable user
                $(".make-switch").bootstrapSwitch({size: "mini", onColor: "success", offColor: "danger"});
            },
            language: {
                "sProcessing": "<img src='" + baseAssets + "/apps/img/preloader.svg'>",
                "sLengthMenu": "أظهر _MENU_ مدخلات",
                "sZeroRecords": "لم يعثر على أية سجلات",
                "sInfo": "إظهار _START_ إلى _END_ من أصل _TOTAL_ مدخل",
                "sInfoEmpty": "يعرض 0 إلى 0 من أصل 0 سجل",
                "sInfoFiltered": "(منتقاة من مجموع _MAX_ مُدخل)",
                "sInfoPostFix": "",
                "sSearch": "ابحث:",
                "sUrl": "",
                "oPaginate": {
                    "sFirst": "الأول",
                    "sPrevious": "السابق",
                    "sNext": "التالي",
                    "sLast": "الأخير"
                }
            },
            "searching": false,
            "ordering": false,

            bStateSave: !0,
            lengthMenu: [[5, 10, 15, 20, -1], [5, 10, 15, 20, "All"]],
            pageLength: 10,
            pagingType: "bootstrap_full_number",
            columnDefs: [{orderable: !1, targets: [0]}, {searchable: !1, targets: [0]}, {className: "dt-right"}],
            order: [[2, "asc"]]
        });
    }

    $(document).on('click', '.approval-edits,.approval-edits-in', function (event) {

        var _this = $(this);
        var action = _this.attr('href');
        event.preventDefault();

        bootbox.confirm({
            message: "تأكيد اعتماد التعديلات!",
            buttons: {

                confirm: {
                    label: 'بالتأكيد <i class="fa fa-check"></i>',
                    className: 'btn-success'
                },
                cancel: {
                    label: 'الغاء<i class="fa fa-times"></i>',
                    className: 'btn-danger'
                }
            },
            callback: function (result) {
                if (result) {
                    $.ajax({
                        url: action,
                        type: 'PUT',
                        dataType: 'json',
                        data: {'_token': csrf_token},
                        success: function (data) {

                            if (data.status) {
                                $('.alert').hide();
                                toastr['success'](data.message, '');

                                if (event.target.id == 'approval-edits')
                                    providers_tbl.api().ajax.reload();
                                else
                                    location.reload()

                            } else {
                                toastr['error'](data.message);
                            }

                        }
                    });
                }
            }
        });

    });
    $(document).on('click', '.reject-edits', function (event) {

        var _this = $(this);
        var action = _this.attr('href');
        event.preventDefault();

        bootbox.confirm({
            message: "تأكيد رفض اعتماد التعديلات!",
            buttons: {

                confirm: {
                    label: 'بالتأكيد <i class="fa fa-check"></i>',
                    className: 'btn-success'
                },
                cancel: {
                    label: 'الغاء<i class="fa fa-times"></i>',
                    className: 'btn-danger'
                }
            },
            callback: function (result) {
                if (result) {
                    $.ajax({
                        url: action,
                        type: 'PUT',
                        dataType: 'json',
                        data: {'_token': csrf_token},
                        success: function (data) {

                            if (data.status) {
                                $('.alert').hide();
                                toastr['success'](data.message, '');

                                if (event.target.id == 'reject-edits')
                                    providers_tbl.api().ajax.reload();
                                else
                                    location.reload()

                            } else {
                                toastr['error'](data.message);
                            }

                        }
                    });
                }
            }
        });

    });

    $(document).on('click', '.user-det', function (e) {
        $("#wait_msg,#overlay").show();
        e.preventDefault();
        var action = $(this).attr('href');
        $.ajax({
            url: action,
            type: 'GET',
            success: function (data) {
                $("#wait_msg,#overlay").hide();

                $('#results-modals').html(data);
                $('#user_view_frm').modal('show', {backdrop: 'static', keyboard: false});
            }, error: function (xhr) {

            }
        });
    });
    $(document).on("click", ".filter-submit", function () {
//                if ($(this).val().length > 3)
        providers_tbl.api().ajax.reload();
    });
    $(document).on('click', '.filter-cancel', function () {

        $(".select2").val('').trigger('change');
        $(this).closest('tr').find('input,select').val('');
        // $('#is_admin_confirm,.status').val('').trigger('change');
        providers_tbl.api().ajax.reload();
    });
})
;
