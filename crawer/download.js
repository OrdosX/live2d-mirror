/* ********** 辞書エリア ここから ********** */

// 最新版のバージョン番号
var LATEST_VERSION_WIN = "4.0.07";
var LATEST_VERSION_MAC = "4.0.07";
// Beta 版がない場合は空文字にする
var LATEST_BETA_VERSION_WIN = "";
var LATEST_BETA_VERSION_MAC = "";

// 最新版の更新日・更新履歴の最新日
var LATEST_DATE_WIN = "2020/12/17";
var LATEST_DATE_MAC = "2020/12/17";
var LATEST_BETA_DATE_WIN = "";
var LATEST_BETA_DATE_MAC = "";

// 過去バージョンのリスト[Key : Value]形式
// HTML生成用の文字列：ファイル名で使用している数値
// 追加する場合は、v3_XX_YY: "3.X.YY" として積んでいく
var OLDER_VERSIONS_WIN = {
    v4_00_07_B1 : "4.0.07 beta1",
    v4_00_06 : "4.0.06",
    v4_00_06_B1 : "4.0.06 beta1",
    v4_00_05 : "4.0.05",
    v4_00_05_B1 : "4.0.05 beta1",
    v4_00_04 : "4.0.04",
    v4_00_04_B1 : "4.0.04-beta1",
    v4_00_03 : "4.0.03",
    v4_00_02 : "4.0.02",
    v4_00_01 : "4.0.01",
    v4_00_00 : "4.0.00",
    v3_03_03 : "3.3.03_1",
    v3_02_07 : "3.2.07_1"
}

var OLDER_VERSIONS_MAC = {
    v4_00_07_B1 : "4.0.07 beta1",
    v4_00_06 : "4.0.06",
    v4_00_06_B1 : "4.0.06 beta1",
    v4_00_05 : "4.0.05",
    v4_00_05_B1 : "4.0.05 beta1",
    v4_00_04 : "4.0.04",
    v4_00_04_B1 : "4.0.04-beta1",
    v4_00_03 : "4.0.03",
    v4_00_02 : "4.0.02",
    v4_00_01 : "4.0.01",
    v4_00_00 : "4.0.00",
    v3_03_02 : "3.3.03_1",
    v3_02_07 : "3.2.07_1",
}


// ファイル名の共通部分
var FILE_NAME_COMMON = "https://cubism.live2d.com/editor/bin/Live2D_Cubism_Setup";

/* ********** 辞書エリア ここまで ********** */

selectEditorLanguage = function(version, language) {
    if (version.slice(0, 1) == "3")
    {
        if (language != "jp")
        {
            language = "en";
        }
    }

    return language;
}

// ダウンロードファイルのURLを生成
genFileURL = function (version, language, suffix) {
    var url =  FILE_NAME_COMMON + "_" + version + "_" + selectEditorLanguage(version, language) + "." + suffix;
    return url;
}

// GoogleAnalyticsにイベント送信
sendGA = function (eventLabelString) {
    var gaParams = {
        hitType: 'event',
        eventCategory: 'CubismEditor',
        eventAction: 'Download',
        eventLabel: eventLabelString
    };
    ga('send', gaParams);
}

// MailChimpにメールアドレスを送信
sendMC = function ($mailForm, callbackFunc) {
    // HTMLに設定された基本言語を取得
    var htmlLang = document.documentElement.lang;
    // ダウンロードできるエディタの言語を設定
    var editorLang = getEditorLanguage(htmlLang);
    var mailChimpUrl;

    if (editorLang == "jp")
    {
        mailChimpUrl = "https://live2d.us14.list-manage.com/subscribe/post?u=114d7889bbc3507ad4a3ae421&amp;id=2bb79c10a6"
    }
    else
    {
        mailChimpUrl = "https://live2d.us14.list-manage.com/subscribe/post?u=114d7889bbc3507ad4a3ae421&amp;id=2bb79c10a6"
    }

    jQuery.support.cors = true;
    var ajaxParams = {
        type: 'GET',//$mailForm.attr('method'),
        url: $mailForm.attr('action').replace('/post?', '/post-json?').concat('&c=?'),
        data: $mailForm.serialize(),
        dataType: 'jsonp',
        contentType: 'application/json; charset=utf-8',
        timeout: 5000,
        crossDomain: true,
        cache: false,
        processdata: true,
        error: function (err) {
            //console.log(err);
            // alert('Could not connect to the registration server. Please try again later.');
        },
        success: function (data) {
            //console.log(data);
            // if (data.result === 'success') {
            //     // Success
            //     alert(data.msg);
            // } else if (data.result === 'error') {
            //     // Something went wrong, do something to notify the user.
            //     alert(data.msg);
            // }
        }
    };
    // MailChimpにajaxで送信. ajaxの処理が終わったらコールバックでダウンロードリンクが渡される
    $.ajax(ajaxParams).done(callbackFunc);
};

getEditorLanguage = function(lang) {
    switch (lang.slice(0, 2))
    {
        case "ja":
            return "jp";
        case "ko":
            return "ko";
        case "zh":
            return "zh";
        case "en":
        default:
            return "en";
    }
}

// Windowロード時に実行.過去バージョンのHTML自動生成とコールバックのセットアップ
window.onload = function() {
    // ボタンにバージョン名を埋め込む
    getField('ver_win').innerHTML = `${LATEST_VERSION_WIN} (${LATEST_DATE_WIN})`
    getField('ver_mac').innerHTML = `${LATEST_VERSION_MAC} (${LATEST_DATE_MAC})`
    if (LATEST_BETA_VERSION_WIN) {
        getField('ver_beta_win').innerHTML = `${LATEST_BETA_VERSION_WIN} (${LATEST_BETA_DATE_WIN})`
    } else {
        // Beta 版インストールボタンを非表示にする
        getField('accept_beta_win').parentElement.style.display = 'none'
    }
    if (LATEST_BETA_VERSION_MAC) {
        getField('ver_beta_mac').innerHTML = `${LATEST_BETA_VERSION_MAC} (${LATEST_BETA_DATE_MAC})`
    } else {
        // Beta 版インストールボタンを非表示にする
        getField('accept_beta_mac').parentElement.style.display = 'none'
    }

    // 更新履歴・Update Hisrotyのhtmlを自動生成
    // 「更新履歴」の文言は、元々の p タグに要素として埋め込まれている。各言語ごとに存在するので、都度参照し設定する。

    let updateHistoryWinText = $('#update_history_win').text();
    let updateHistoryMacText = $('#update_history_mac').text();
    $('#update_history_win').html(`<a href="https://docs.live2d.com/cubism-editor-manual/updates4/">${updateHistoryWinText}</a>`);
    $('#update_history_mac').html(`<a href="https://docs.live2d.com/cubism-editor-manual/updates4/">${updateHistoryMacText}</a>`);
    $('#archive_list_win').empty();
    $('#archive_list_mac').empty();

    // 以前のバージョンのリストのhtmlを自動生成
    for (var key in OLDER_VERSIONS_WIN) {
        $('#archive_list_win').append(
            "<a class=\"list-group-item archive_list_item\" id=" + key + ">" + OLDER_VERSIONS_WIN[key] + "</a>"
        );
    }
    for (var key in OLDER_VERSIONS_MAC) {
        $('#archive_list_mac').append(
            "<a class=\"list-group-item archive_list_item\" id=" + key + ">" + OLDER_VERSIONS_MAC[key] + "</a>"
        );
    }

    // フォームのEnable/Disableの初期化
    fieldChanged();

    // コールバック関数の初期化
    archiveButtonClicked();

    // メールアドレス入力情報を取得
    var $mailForm = $('#mc-embedded-subscribe-form');
    var emailAddress = document.getElementById('mce-EMAIL');
    $mailForm.validate({
        rules: {
            EMAIL: {
                required: false
            }
        },
        onkeyup: function(b, c) {
            if($mailForm.valid() && emailAddress.value !== "") {
                mailValidSuccess();
            }else{
                mailInvalid();
            }

            fieldChanged();
        },
        success: function(label) {
            mailValidSuccess();
        },
        errorPlacement: function(form, validator){
            mailInvalid();
        }
    });



    // コールバック関数をセットする処理
    // Windows版の最新をDL
    var btnDlWin = getField("accept_win");
    btnDlWin.addEventListener("click", function(e) {
        // HTMLに設定された基本言語を取得
        var htmlLang = document.documentElement.lang;
        // ダウンロードできるエディタの言語を設定
        var editorLang = getEditorLanguage(htmlLang);

        var downloadFunction = function(){
            location.href = genFileURL(LATEST_VERSION_WIN, editorLang, "exe");
        }
        sendGA('L_' + LATEST_VERSION_WIN + '_' + editorLang + '_win');   // <最新版(L:latest)／過去版(O:older)>_<言語>_<OS>

        if(dltype === "install")
        {
            sendMC($mailForm, downloadFunction);
        }
        else
        {
        	downloadFunction();
        }
    });

    // Mac版の最新をDL
    var btnDlMac = getField("accept_mac");
    btnDlMac.addEventListener("click", function(e) {
        // HTMLに設定された基本言語を取得
        var htmlLang = document.documentElement.lang;
        // ダウンロードできるエディタの言語を設定
        var editorLang = getEditorLanguage(htmlLang);

        var downloadFunction = function(){
            location.href = genFileURL(LATEST_VERSION_MAC, editorLang, "pkg");
        }
        sendGA('L_' + LATEST_VERSION_MAC + '_' + editorLang + '_mac'); // <最新版(L:latest)／過去版(O:older)>_<言語>_<OS>

        if(dltype === "install")
        {
            sendMC($mailForm, downloadFunction);
        }
        else
        {
        	downloadFunction();
        }
    });

    // コールバック関数をセットする処理
    // Windows版の最新をDL
    var btnDlBetaWin = getField("accept_beta_win");
    btnDlBetaWin.addEventListener("click", function(e) {
        // HTMLに設定された基本言語を取得
        var htmlLang = document.documentElement.lang;
        // ダウンロードできるエディタの言語を設定
        var editorLang = getEditorLanguage(htmlLang);

        var downloadFunction = function(){
            location.href = genFileURL(LATEST_BETA_VERSION_WIN, editorLang, "exe");
        }
        sendGA('L_' + LATEST_BETA_VERSION_WIN + '_' + editorLang + '_win');   // <最新版(L:latest)／過去版(O:older)>_<言語>_<OS>

        if(dltype === "install")
        {
            sendMC($mailForm, downloadFunction);
        }
        else
        {
        	downloadFunction();
        }
    });

    // Mac版の最新をDL
    var btnDlBetaMac = getField("accept_beta_mac");
    btnDlBetaMac.addEventListener("click", function(e) {
        // HTMLに設定された基本言語を取得
        var htmlLang = document.documentElement.lang;
        // ダウンロードできるエディタの言語を設定
        var editorLang = getEditorLanguage(htmlLang);

        var downloadFunction = function(){
            location.href = genFileURL(LATEST_BETA_VERSION_MAC, editorLang, "pkg");
        }
        sendGA('L_' + LATEST_BETA_VERSION_MAC + '_' + editorLang + '_mac'); // <最新版(L:latest)／過去版(O:older)>_<言語>_<OS>

        if(dltype === "install")
        {
            sendMC($mailForm, downloadFunction);
        }
        else
        {
        	downloadFunction();
        }
    });

    // Windows版の過去版をDL
    var archiveDlWin = getField("archive_list_win");
    archiveDlWin.addEventListener("click", function(e) {
        // HTMLに設定された基本言語を取得
        var htmlLang = document.documentElement.lang;
        // ダウンロードできるエディタの言語を設定
        var editorLang = getEditorLanguage(htmlLang);

        var version = e.target.id;
        var downloadFunction = function(){
            location.href = genFileURL(OLDER_VERSIONS_WIN[version], editorLang, "exe");
        }
        sendGA('O_' + OLDER_VERSIONS_WIN[version] + '_' + editorLang + '_win');  // <最新版(L:latest)／過去版(O:older)>_<言語>_<OS>

        if(dltype === "install")
        {
            sendMC($mailForm, downloadFunction);
        }
        else
        {
        	downloadFunction();
        }
    });

    // Mac版の過去版をDL
    var archiveDlMac = getField("archive_list_mac");
    archiveDlMac.addEventListener("click", function(e) {
        // HTMLに設定された基本言語を取得
        var htmlLang = document.documentElement.lang;
        // ダウンロードできるエディタの言語を設定
        var editorLang = getEditorLanguage(htmlLang);

        var version = e.target.id;
        var downloadFunction = function(){
            location.href = genFileURL(OLDER_VERSIONS_MAC[version], editorLang, "pkg");
        }
        sendGA('O_' + OLDER_VERSIONS_MAC[version] + '_' + editorLang + '_mac');  // <最新版(L:latest)／過去版(O:older)>_<言語>_<OS>

        if(dltype === "install")
        {
            sendMC($mailForm, downloadFunction);
        }
        else
        {
        	downloadFunction();
        }
    });
};
