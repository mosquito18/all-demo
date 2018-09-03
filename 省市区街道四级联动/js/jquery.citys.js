$(document).ready(function () {
    var provinceId = 0, areaId = 0, cityId = 0, townId = 0;
    　　$(".pay-alipay-button").click(function () {
        var userName = $('input[name="userName"]').val();
        var mobile = $('input[name="mobile"]').val();
        var address = $('input[name="address"]').val();
        var data={
            userName:userName,
            mobile:mobile,
            area: {
              provinceId:provinceId,
              cityId:areaId,
              countyId: cityId,
              townId:townId,
            },
            address:address,
            returnUrl: 'http://jambo.jianbaolife.com/payresult.html',
            productId: 123123,
        };
        
        $.ajax({
            url: 'https://jianbaopay-test.laobai.com/pay/special',
            type: 'POST',
            contentType: 'application/json',
            data:JSON.stringify(data),
            success:function(result){
                if(result.rc===0){
                    document.write(result.data.html);
                }
                // console.log(result)
            }
        })
        // console.log(provinceId, areaId, cityId, townId)
        　　　　//adding your code here　　 
    　　});

    $('input[name="mobile"]').change(function(e){
        var mobile=$(this).val();
        
        var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
        if (!myreg.test(mobile)) {
            $(".error-tip").show();
        } else {
            $(".error-tip").hide()
        }

    });


    var $this = $("#area");
    var $province = $this.find('select[name="province"]'),
        $city = $this.find('select[name="city"]'),
        $area = $this.find('select[name="area"]'),
        $town = $this.find('select[name="town"]');
    $.ajax({
        url: 'http://core.laobai.com/legacy/jbu/JbuGetSortedArea',
        type: 'POST',
        dataType: 'json',
        jsonpCallback: 'jsonp_location',
        success: function (result) {
            if (result.rc == 0) {
                var formatProvince = [], provinceField = [], currentProvince = null, cityField = [], currentCity = null, areaField = [], currentArea = null, townField = [];
                formatProvince = result.data.province_list;
                formatProvince.map(function (value, index) {
                    provinceField.push(value.area_name);
                })
                var format = {
                    province: function () {
                        $province.empty();
                        $province.append('<option value=""> - 请选择 - </option>');
                        $province.prop('disabled', provinceField.length === 0);
                        for (var i in provinceField) {
                            $province.append('<option value="' + i + '" data-code="' + i + '">' + provinceField[i] + '</option>');
                        }
                        this.city();
                    },
                    city: function () {
                        $city.empty();
                        $city.append('<option value=""> - 请选择 - </option>');
                        $city.prop('disabled', cityField.length === 0);
                        for (var i in cityField) {
                            $city.append('<option value="' + i + '" data-code="' + i + '">' + cityField[i] + '</option>');
                        }
                        this.area();
                    },
                    area: function () {
                        $area.empty();
                        $area.append('<option value=""> - 请选择 - </option>');
                        $area.prop('disabled', areaField.length === 0);
                        for (var i in areaField) {
                            $area.append('<option value="' + i + '" data-code="' + i + '">' + areaField[i] + '</option>');
                        }
                        this.town();
                    },
                    town: function () {
                        $town.empty();
                        $town.append('<option value=""> - 请选择 - </option>');
                        $town.prop('disabled', townField.length === 0);
                        for (var i in townField) {
                            $town.append('<option value="' + i + '" data-code="' + i + '">' + townField[i] + '</option>');
                        }
                    }

                };

                format.province();
                //事件绑定
                $province.on('change', function () {
                    currentProvince = null, cityField = [], cityId = 0, currentCity = null, areaField = [], areaId = 0, currentArea = null, townField = [], townId = 0;
                    currentProvince = formatProvince[$province.find('option:selected').attr('data-code')]
                    provinceId = currentProvince.area_id;
                    // cityId = currentProvince.city_list[0].area_id;
                    currentProvince.city_list.map(function (value, index) {
                        cityField.push(value.area_name);
                    });
                    format.city();
                });
                $city.on('change', function () {
                    currentCity = null, areaField = [], areaId = 0, currentArea = null, townField = [], townId = 0;
                    currentCity = currentProvince.city_list[$city.find('option:selected').attr('data-code')]
                    cityId = currentCity.area_id;
                    // areaId=currentCity.county_list[0].area_id;
                    currentCity.county_list.map(function (value, index) {
                        areaField.push(value.area_name);
                    });
                    format.area();
                });
                $area.on('change', function () {
                    areaId = 0, currentArea = null, townField = [], townId = 0;
                    currentArea = currentCity.county_list[$area.find('option:selected').attr('data-code')]
                    areaId = currentArea.area_id;
                    // townId =currentArea.town_list[0].area_id;
                    currentArea.town_list.map(function (value, index) {
                        townField.push(value.area_name);
                    });
                    format.town();
                    // console.log(townField)
                });
                $town.on('change', function () {
                    townId = currentArea.town_list[$town.find('option:selected').attr('data-code')].area_id;
                })

            }

        }
    })
});