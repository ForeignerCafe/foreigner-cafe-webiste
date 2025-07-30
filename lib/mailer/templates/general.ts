export function generalTemplate({
  subject,
  html,
  coupon,
}: {
  subject?: string;
  coupon?: string;
  html: string;
}) {
  return `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html
  dir="ltr"
  xmlns="http://www.w3.org/1999/xhtml"
  xmlns:o="urn:schemas-microsoft-com:office:office"
  lang="en"
  style="font-family: arial, 'helvetica neue', helvetica, sans-serif"
>
  <head>
    <meta charset="UTF-8" />
    <meta content="width=device-width, initial-scale=1" name="viewport" />
    <meta name="x-apple-disable-message-reformatting" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta content="telephone=no" name="format-detection" />
    <title>General NewsLette</title>
    <!--[if (mso 16)]>
      <style type="text/css">
        a {
          text-decoration: none;
        }
      </style>
    <![endif]-->
    <!--[if gte mso 9
      ]><style>
        sup {
          font-size: 100% !important;
        }
      </style><!
    [endif]-->
    <!--[if gte mso 9]>
      <noscript>
        <xml>
          <o:OfficeDocumentSettings>
            <o:AllowPNG></o:AllowPNG>
            <o:PixelsPerInch>96</o:PixelsPerInch>
          </o:OfficeDocumentSettings>
        </xml>
      </noscript>
    <![endif]-->
    <!--[if !mso]><!-- -->
    <link
      href="https://fonts.googleapis.com/css2?family=Oswald:wght@500&display=swap"
      rel="stylesheet"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=Raleway&display=swap"
      rel="stylesheet"
    />
    <!--<![endif]-->
    <!--[if mso
      ]><xml>
        <w:WordDocument xmlns:w="urn:schemas-microsoft-com:office:word">
          <w:DontUseAdvancedTypographyReadingMail></w:DontUseAdvancedTypographyReadingMail>
        </w:WordDocument> </xml
    ><![endif]-->
    <style type="text/css">
      #outlook a {
        padding: 0;
      }
      .u {
        mso-style-priority: 100 !important;
        text-decoration: none !important;
      }
      a[x-apple-data-detectors] {
        color: inherit !important;
        text-decoration: none !important;
        font-size: inherit !important;
        font-family: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
      }
      .a {
        display: none;
        float: left;
        overflow: hidden;
        width: 0;
        max-height: 0;
        line-height: 0;
        mso-hide: all;
      }
      @media only screen and (max-width: 600px) {
        p,
        ul li,
        ol li,
        a {
          line-height: 150% !important;
        }
        h1,
        h2,
        h3,
        h1 a,
        h2 a,
        h3 a {
          line-height: 120%;
        }
        h1 {
          font-size: 30px !important;
          text-align: left;
        }
        h2 {
          font-size: 24px !important;
          text-align: left;
        }
        h3 {
          font-size: 20px !important;
          text-align: left;
        }
        .d td a {
          font-size: 14px !important;
        }
        .bb p,
        .bb ul li,
        .bb ol li,
        .bb a {
          font-size: 14px !important;
        }
        .ba p,
        .ba ul li,
        .ba ol li,
        .ba a {
          font-size: 14px !important;
        }
        .z p,
        .z ul li,
        .z ol li,
        .z a {
          font-size: 12px !important;
        }
        *[class="gmail-fix"] {
          display: none !important;
        }
        .x,
        .x h1,
        .x h2,
        .x h3 {
          text-align: center !important;
        }
        .v {
          display: inline-block !important;
        }
        a.u,
        button.u {
          font-size: 18px !important;
          display: inline-block !important;
        }
        .r table,
        .s,
        .t {
          width: 100% !important;
        }
        .o table,
        .p table,
        .q table,
        .o,
        .q,
        .p {
          width: 100% !important;
          max-width: 600px !important;
        }
        .adapt-img {
          width: 100% !important;
          height: auto !important;
        }
        .l {
          padding-right: 0px !important;
        }
        .h {
          padding-bottom: 20px !important;
        }
        .d td {
          width: 1% !important;
        }
        table.c,
        .esd-block-html table {
          width: auto !important;
        }
        table.b {
          display: inline-block !important;
        }
        table.b td {
          display: inline-block !important;
        }
      }
      @media screen and (max-width: 384px) {
        .mail-message-content {
          width: 414px !important;
        }
      }
    </style>
  </head>
  <body
    style="
      width: 100%;
      font-family: arial, 'helvetica neue', helvetica, sans-serif;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
      padding: 0;
      margin: 0;
    "
  >
    <div
      dir="ltr"
      class="es-wrapper-color"
      lang="en"
      style="background-color: #83631e"
    >
      <!--[if gte mso 9]>
        <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
          <v:fill
            type="tile"
            src="https://eflhdlb.stripocdn.email/content/guids/CABINET_58a54e8e78fabb698281c2706073412d981de670155b27883b5acf41bd4a283a/images/chatgpt_image_jul_30_2025_09_54_07_pm_1.png"
            color="#83631e"
            origin="0.5, 0"
            position="0.5, 0"
          ></v:fill>
        </v:background>
      <![endif]-->
      <table
        class="es-wrapper"
        width="100%"
        cellspacing="0"
        cellpadding="0"
        background="https://eflhdlb.stripocdn.email/content/guids/CABINET_58a54e8e78fabb698281c2706073412d981de670155b27883b5acf41bd4a283a/images/chatgpt_image_jul_30_2025_09_54_07_pm_1.png"
        style="
          mso-table-lspace: 0pt;
          mso-table-rspace: 0pt;
          border-collapse: collapse;
          border-spacing: 0px;
          padding: 0;
          margin: 0;
          width: 100%;
          height: 100%;
          background-repeat: no-repeat;
          background-position: left top;
          background-image: url(https://eflhdlb.stripocdn.email/content/guids/CABINET_58a54e8e78fabb698281c2706073412d981de670155b27883b5acf41bd4a283a/images/chatgpt_image_jul_30_2025_09_54_07_pm_1.png);
          background-color: #83631e;
        "
        role="none"
      >
        <tr>
          <td valign="top" style="padding: 0; margin: 0">
            <table
              class="o"
              cellspacing="0"
              cellpadding="0"
              align="center"
              role="none"
              style="
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
                border-collapse: collapse;
                border-spacing: 0px;
                table-layout: fixed !important;
                width: 100%;
              "
            >
              <tr>
                <td align="center" style="padding: 0; margin: 0">
                  <table
                    class="bb"
                    style="
                      mso-table-lspace: 0pt;
                      mso-table-rspace: 0pt;
                      border-collapse: collapse;
                      border-spacing: 0px;
                      background-color: #fff2cc;
                      width: 770px;
                    "
                    cellspacing="0"
                    cellpadding="0"
                    bgcolor="#fff2cc"
                    align="center"
                    role="none"
                  >
                    <tr>
                      <td
                        align="left"
                        background="https://eflhdlb.stripocdn.email/content/guids/CABINET_7ef6ac99b122628d3f98419bc63bfd70fb77c0f9128b14891ec77012b6cb7760/images/frame_4075644.png"
                        style="
                          padding: 0;
                          margin: 0;
                          padding-left: 20px;
                          padding-right: 20px;
                          background-image: url(https://eflhdlb.stripocdn.email/content/guids/CABINET_7ef6ac99b122628d3f98419bc63bfd70fb77c0f9128b14891ec77012b6cb7760/images/frame_4075644.png);
                          background-repeat: no-repeat;
                          background-position: center top;
                        "
                      >
                        <table
                          width="100%"
                          cellspacing="0"
                          cellpadding="0"
                          role="none"
                          style="
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            border-collapse: collapse;
                            border-spacing: 0px;
                          "
                        >
                          <tr>
                            <td
                              class="l h"
                              valign="top"
                              align="center"
                              style="padding: 0; margin: 0; width: 730px"
                            >
                              <table
                                width="100%"
                                cellspacing="0"
                                cellpadding="0"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  border-collapse: collapse;
                                  border-spacing: 0px;
                                "
                              >
                                <tr>
                                  <td
                                    align="center"
                                    style="
                                      padding: 0;
                                      margin: 0;
                                      font-size: 0px;
                                    "
                                  >
                                    <a
                                      target="_blank"
                                      href="https://viewstripo.email"
                                      style="
                                        -webkit-text-size-adjust: none;
                                        -ms-text-size-adjust: none;
                                        mso-line-height-rule: exactly;
                                        text-decoration: underline;
                                        color: #2cb543;
                                        font-size: 18px;
                                      "
                                      ><img
                                        class="adapt-img"
                                        src="https://eflhdlb.stripocdn.email/content/guids/CABINET_58a54e8e78fabb698281c2706073412d981de670155b27883b5acf41bd4a283a/images/chatgpt_image_jul_30_2025_09_08_08_pm_1_1.png"
                                        alt="Foreigner Cafe Barista"
                                        style="
                                          display: block;
                                          border: 0;
                                          outline: none;
                                          text-decoration: none;
                                          -ms-interpolation-mode: bicubic;
                                        "
                                        width="425"
                                        title="Foreigner Cafe Barista"
                                    /></a>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            <table
              cellpadding="0"
              cellspacing="0"
              class="o"
              align="center"
              role="none"
              style="
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
                border-collapse: collapse;
                border-spacing: 0px;
                table-layout: fixed !important;
                width: 100%;
              "
            >
              <tr>
                <td align="center" style="padding: 0; margin: 0">
                  <table
                    bgcolor="#ffffff"
                    class="bb"
                    align="center"
                    cellpadding="0"
                    cellspacing="0"
                    role="none"
                    style="
                      mso-table-lspace: 0pt;
                      mso-table-rspace: 0pt;
                      border-collapse: collapse;
                      border-spacing: 0px;
                      background-color: #ffffff;
                      width: 770px;
                    "
                  >
                    <tr>
                      <td
                        align="left"
                        bgcolor="#fff2cc"
                        style="
                          margin: 0;
                          padding-left: 20px;
                          padding-right: 20px;
                          padding-top: 30px;
                          padding-bottom: 40px;
                          background-color: #fff2cc;
                        "
                      >
                        <table
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          role="none"
                          style="
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            border-collapse: collapse;
                            border-spacing: 0px;
                          "
                        >
                          <tr>
                            <td
                              align="center"
                              valign="top"
                              style="padding: 0; margin: 0; width: 730px"
                            >
                              <table
                                cellpadding="0"
                                cellspacing="0"
                                width="100%"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  border-collapse: collapse;
                                  border-spacing: 0px;
                                "
                              >
                                <tr>
                                  <td
                                    align="center"
                                    class="x"
                                    style="
                                      padding: 0;
                                      margin: 0;
                                      padding-top: 10px;
                                      padding-bottom: 30px;
                                    "
                                  >
                                    <h1
                                      style="
                                        margin: 0;
                                        line-height: 48px;
                                        mso-line-height-rule: exactly;
                                        font-family: Oswald, sans-serif;
                                        font-size: 40px;
                                        font-style: normal;
                                        font-weight: normal;
                                        color: #333333;
                                      "
                                    >
                                      HELLO FOREIGNER! 👋🌍
                                    </h1>
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    align="center"
                                    style="
                                      padding: 0;
                                      margin: 0;
                                      padding-bottom: 5px;
                                      padding-left: 20px;
                                      padding-right: 20px;
                                      font-size: 0;
                                    "
                                  >
                                    <table
                                      border="0"
                                      width="40%"
                                      height="100%"
                                      cellpadding="0"
                                      cellspacing="0"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        border-collapse: collapse;
                                        border-spacing: 0px;
                                        width: 40% !important;
                                        display: inline-table;
                                      "
                                      role="presentation"
                                    >
                                      <tr>
                                        <td
                                          style="
                                            padding: 0;
                                            margin: 0;
                                            border-bottom: 4px solid #31530f;
                                            background: unset;
                                            height: 0px;
                                            width: 100%;
                                            margin: 0px;
                                          "
                                        ></td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    align="center"
                                    style="
                                      padding: 0;
                                      margin: 0;
                                      padding-left: 20px;
                                      padding-right: 20px;
                                      font-size: 0;
                                    "
                                  >
                                    <table
                                      border="0"
                                      width="20%"
                                      height="100%"
                                      cellpadding="0"
                                      cellspacing="0"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        border-collapse: collapse;
                                        border-spacing: 0px;
                                        width: 20% !important;
                                        display: inline-table;
                                      "
                                      role="presentation"
                                    >
                                      <tr>
                                        <td
                                          style="
                                            padding: 0;
                                            margin: 0;
                                            border-bottom: 4px solid #31530f;
                                            background: unset;
                                            height: 0px;
                                            width: 100%;
                                            margin: 0px;
                                          "
                                        ></td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                                <tr>
                                  ${html}
                                </tr>
                                <tr>
  <td align="center" style="padding: 0; margin: 0">
    ${
      coupon
        ? `
      <span
        style="
          display: inline-block;
          background: #ec8014;
          color: #ffffff;
          font-size: 20px;
          padding: 10px 20px;
          border-radius: 15px;
          font-family: Raleway, Arial, sans-serif;
          font-weight: bold;
          line-height: 24px;
          text-align: center;
        "
      >
        Use Code: ${coupon}
      </span>
    `
        : `
    <!--[if mso]><a href="https://www.foreignercafe.com" target="_blank" hidden>
      <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word"
        esdevVmlButton href="https://www.foreignercafe.com"
        style="height: 44px; v-text-anchor: middle; width: 216px;" arcsize="34%" stroke="f" fillcolor="#ec8014">
        <w:anchorlock></w:anchorlock>
        <center
          style="color: #ffffff; font-family: Raleway, Arial, sans-serif; font-size: 18px; font-weight: 700; line-height: 18px; mso-text-raise: 1px;">
          Visit Our Website
        </center>
      </v:roundrect></a><![endif]-->
    <!--[if !mso]><!-- -->
    <span
      class="msohide v"
      style="
        border-style: solid;
        border-color: #2cb543;
        background: #ec8014;
        border-width: 0px;
        display: inline-block;
        border-radius: 15px;
        width: auto;
        mso-hide: all;
      "
    >
      <a
        href="https://www.foreignercafe.com"
        class="u"
        target="_blank"
        style="
          mso-style-priority: 100 !important;
          text-decoration: none;
          -webkit-text-size-adjust: none;
          -ms-text-size-adjust: none;
          mso-line-height-rule: exactly;
          color: #ffffff;
          font-size: 20px;
          padding: 10px 20px 10px 20px;
          display: inline-block;
          background: #ec8014;
          border-radius: 15px;
          font-family: Raleway, Arial, sans-serif;
          font-weight: bold;
          font-style: normal;
          line-height: 24px;
          width: auto;
          text-align: center;
          mso-padding-alt: 0;
          mso-border-alt: 10px solid #ec8014;
        "
      >
        Visit Our Website
      </a>
    </span>
    <!--<![endif]-->
    `
    }
  </td>
</tr>
                                <tr>
                                  <td
                                    align="center"
                                    style="
                                      padding: 0;
                                      margin: 0;
                                      padding-top: 30px;
                                      font-size: 0px;
                                    "
                                  >
                                    <a
                                      target="_blank"
                                      href="https://viewstripo.email"
                                      style="
                                        -webkit-text-size-adjust: none;
                                        -ms-text-size-adjust: none;
                                        mso-line-height-rule: exactly;
                                        text-decoration: underline;
                                        color: #2cb543;
                                        font-size: 18px;
                                      "
                                      ><img
                                        src="https://eflhdlb.stripocdn.email/content/guids/CABINET_7ef6ac99b122628d3f98419bc63bfd70fb77c0f9128b14891ec77012b6cb7760/images/group_zda.png"
                                        alt=""
                                        style="
                                          display: block;
                                          border: 0;
                                          outline: none;
                                          text-decoration: none;
                                          -ms-interpolation-mode: bicubic;
                                        "
                                        width="155"
                                    /></a>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            <table
              cellpadding="0"
              cellspacing="0"
              class="q"
              align="center"
              role="none"
              style="
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
                border-collapse: collapse;
                border-spacing: 0px;
                table-layout: fixed !important;
                width: 100%;
                background-color: transparent;
                background-repeat: repeat;
                background-position: center top;
              "
            >
              <tr>
                <td align="center" style="padding: 0; margin: 0">
                  <table
                    bgcolor="#ec8014"
                    class="ba"
                    align="center"
                    cellpadding="0"
                    cellspacing="0"
                    style="
                      mso-table-lspace: 0pt;
                      mso-table-rspace: 0pt;
                      border-collapse: collapse;
                      border-spacing: 0px;
                      background-color: #ec8014;
                      width: 770px;
                    "
                    role="none"
                  >
                    <tr>
                      <td
                        align="left"
                        style="
                          padding: 0;
                          margin: 0;
                          padding-left: 20px;
                          padding-right: 20px;
                          padding-top: 30px;
                        "
                      >
                        <!--[if mso]><table style="width:730px" cellpadding="0" 
                        cellspacing="0"><tr><td style="width:355px" valign="top"><![endif]-->
                        <table
                          cellpadding="0"
                          cellspacing="0"
                          class="s"
                          align="left"
                          role="none"
                          style="
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            border-collapse: collapse;
                            border-spacing: 0px;
                            float: left;
                          "
                        >
                          <tr>
                            <td
                              class="h"
                              align="left"
                              style="padding: 0; margin: 0; width: 355px"
                            >
                              <table
                                cellpadding="0"
                                cellspacing="0"
                                width="100%"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  border-collapse: collapse;
                                  border-spacing: 0px;
                                "
                              >
                                <tr>
                                  <td
                                    align="left"
                                    style="
                                      padding: 0;
                                      margin: 0;
                                      padding-top: 15px;
                                      padding-bottom: 15px;
                                      font-size: 0;
                                    "
                                  >
                                    <table
                                      cellpadding="0"
                                      cellspacing="0"
                                      class="c b"
                                      role="presentation"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        border-collapse: collapse;
                                        border-spacing: 0px;
                                      "
                                    >
                                      <tr>
                                        <td
                                          align="center"
                                          valign="top"
                                          style="
                                            padding: 0;
                                            margin: 0;
                                            padding-right: 30px;
                                          "
                                        >
                                          <a
                                            target="_blank"
                                            href="https://facebook.com/foreignercafe"
                                            style="
                                              -webkit-text-size-adjust: none;
                                              -ms-text-size-adjust: none;
                                              mso-line-height-rule: exactly;
                                              text-decoration: underline;
                                              color: #ffffff;
                                              font-size: 12px;
                                            "
                                            ><img
                                              src="https://eflhdlb.stripocdn.email/content/assets/img/social-icons/logo-white/facebook-logo-white.png"
                                              alt="Fb"
                                              title="Facebook"
                                              height="24"
                                              style="
                                                display: block;
                                                border: 0;
                                                outline: none;
                                                text-decoration: none;
                                                -ms-interpolation-mode: bicubic;
                                              "
                                          /></a>
                                        </td>
                                        <td
                                          align="center"
                                          valign="top"
                                          style="
                                            padding: 0;
                                            margin: 0;
                                            padding-right: 30px;
                                          "
                                        >
                                          <a
                                            target="_blank"
                                            href="https://twitter.com/foreignercafe"
                                            style="
                                              -webkit-text-size-adjust: none;
                                              -ms-text-size-adjust: none;
                                              mso-line-height-rule: exactly;
                                              text-decoration: underline;
                                              color: #ffffff;
                                              font-size: 12px;
                                            "
                                            ><img
                                              src="https://eflhdlb.stripocdn.email/content/assets/img/social-icons/logo-white/x-logo-white.png"
                                              alt="Х"
                                              title="Х"
                                              height="24"
                                              style="
                                                display: block;
                                                border: 0;
                                                outline: none;
                                                text-decoration: none;
                                                -ms-interpolation-mode: bicubic;
                                              "
                                          /></a>
                                        </td>
                                        <td
                                          align="center"
                                          valign="top"
                                          style="
                                            padding: 0;
                                            margin: 0;
                                            padding-right: 30px;
                                          "
                                        >
                                          <a
                                            target="_blank"
                                            href="https://instagram.com/foreignercafe"
                                            style="
                                              -webkit-text-size-adjust: none;
                                              -ms-text-size-adjust: none;
                                              mso-line-height-rule: exactly;
                                              text-decoration: underline;
                                              color: #ffffff;
                                              font-size: 12px;
                                            "
                                            ><img
                                              src="https://eflhdlb.stripocdn.email/content/assets/img/social-icons/logo-white/instagram-logo-white.png"
                                              alt="Ig"
                                              title="Instagram"
                                              height="24"
                                              style="
                                                display: block;
                                                border: 0;
                                                outline: none;
                                                text-decoration: none;
                                                -ms-interpolation-mode: bicubic;
                                              "
                                          /></a>
                                        </td>
                                        <td
                                          align="center"
                                          valign="top"
                                          style="padding: 0; margin: 0"
                                        >
                                          <a
                                            target="_blank"
                                            href="https://youtube.com/foreignercafe"
                                            style="
                                              -webkit-text-size-adjust: none;
                                              -ms-text-size-adjust: none;
                                              mso-line-height-rule: exactly;
                                              text-decoration: underline;
                                              color: #ffffff;
                                              font-size: 12px;
                                            "
                                            ><img
                                              src="https://eflhdlb.stripocdn.email/content/assets/img/social-icons/logo-white/youtube-logo-white.png"
                                              alt="Yt"
                                              title="Youtube"
                                              height="24"
                                              style="
                                                display: block;
                                                border: 0;
                                                outline: none;
                                                text-decoration: none;
                                                -ms-interpolation-mode: bicubic;
                                              "
                                          /></a>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                                <tr>
                                  <td style="padding: 0; margin: 0">
                                    <table
                                      cellpadding="0"
                                      cellspacing="0"
                                      width="100%"
                                      class="d"
                                      role="presentation"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        border-collapse: collapse;
                                        border-spacing: 0px;
                                      "
                                    >
                                      <tr class="links">
                                        <td
                                          align="left"
                                          valign="top"
                                          id="esd-menu-id-0"
                                          style="
                                            padding: 0;
                                            margin: 0;
                                            padding-top: 10px;
                                            padding-bottom: 10px;
                                            border: 0;
                                          "
                                        >
                                          <a
                                            target="_blank"
                                            href="https://www.foreignercafe.com"
                                            style="
                                              -webkit-text-size-adjust: none;
                                              -ms-text-size-adjust: none;
                                              mso-line-height-rule: exactly;
                                              text-decoration: none;
                                              display: block;
                                              font-family: Raleway, Arial,
                                                sans-serif;
                                              color: #ffffff;
                                              font-size: 12px;
                                              font-weight: bold;
                                            "
                                            >Privacy Policy</a
                                          >
                                        </td>
                                        <td
                                          align="left"
                                          valign="top"
                                          id="esd-menu-id-1"
                                          style="
                                            padding: 0;
                                            margin: 0;
                                            padding-top: 10px;
                                            padding-bottom: 10px;
                                            border: 0;
                                          "
                                        >
                                          <a
                                            target="_blank"
                                            href="https://www.foreignercafe.com"
                                            style="
                                              -webkit-text-size-adjust: none;
                                              -ms-text-size-adjust: none;
                                              mso-line-height-rule: exactly;
                                              text-decoration: none;
                                              display: block;
                                              font-family: Raleway, Arial,
                                                sans-serif;
                                              color: #ffffff;
                                              font-size: 12px;
                                              font-weight: bold;
                                            "
                                            >Terms of use</a
                                          >
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    align="left"
                                    style="
                                      padding: 0;
                                      margin: 0;
                                      padding-top: 15px;
                                      padding-bottom: 15px;
                                    "
                                  >
                                    <p
                                      style="
                                        margin: 0;
                                        -webkit-text-size-adjust: none;
                                        -ms-text-size-adjust: none;
                                        mso-line-height-rule: exactly;
                                        font-family: Raleway, Arial, sans-serif;
                                        line-height: 18px;
                                        color: #ffffff;
                                        font-size: 12px;
                                      "
                                    >
                                      No longer want to receive these emails?
                                      <a
                                        target="_blank"
                                        href="https://www.foreignercafe.com/unsubscribe"
                                        style="
                                          -webkit-text-size-adjust: none;
                                          -ms-text-size-adjust: none;
                                          mso-line-height-rule: exactly;
                                          text-decoration: underline;
                                          color: #ffffff;
                                          font-size: 12px;
                                        "
                                        >Unsubscribe.</a
                                      >
                                    </p>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                        <!--[if mso]></td><td style="width:20px"></td><td style="width:355px" valign="top"><![endif]-->
                        <table
                          cellpadding="0"
                          cellspacing="0"
                          class="t"
                          align="right"
                          role="none"
                          style="
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            border-collapse: collapse;
                            border-spacing: 0px;
                            float: right;
                          "
                        >
                          <tr>
                            <td
                              align="left"
                              style="padding: 0; margin: 0; width: 355px"
                            >
                              <table
                                cellpadding="0"
                                cellspacing="0"
                                width="100%"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  border-collapse: collapse;
                                  border-spacing: 0px;
                                "
                              >
                                <tr>
                                  <td
                                    align="center"
                                    style="
                                      padding: 0;
                                      margin: 0;
                                      font-size: 0px;
                                    "
                                  >
                                    <a
                                      target="_blank"
                                      href="https://www.foreignercafe.com"
                                      style="
                                        -webkit-text-size-adjust: none;
                                        -ms-text-size-adjust: none;
                                        mso-line-height-rule: exactly;
                                        text-decoration: underline;
                                        color: #ffffff;
                                        font-size: 12px;
                                      "
                                      ><img
                                        src="https://eflhdlb.stripocdn.email/content/guids/CABINET_58a54e8e78fabb698281c2706073412d981de670155b27883b5acf41bd4a283a/images/coffeecupcartoonillustrationcoffeemugdrinkiconconceptisolatedfreevectorremovebgprev.png"
                                        alt=""
                                        style="
                                          display: block;
                                          border: 0;
                                          outline: none;
                                          text-decoration: none;
                                          -ms-interpolation-mode: bicubic;
                                        "
                                        width="155"
                                    /></a>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                        <!--[if mso]></td></tr></table><![endif]-->
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            <table
              cellpadding="0"
              cellspacing="0"
              class="o"
              align="center"
              role="none"
              style="
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
                border-collapse: collapse;
                border-spacing: 0px;
                table-layout: fixed !important;
                width: 100%;
              "
            >
              <tr>
                <td align="center" style="padding: 0; margin: 0">
                  <table
                    class="bb"
                    align="center"
                    cellpadding="0"
                    cellspacing="0"
                    style="
                      mso-table-lspace: 0pt;
                      mso-table-rspace: 0pt;
                      border-collapse: collapse;
                      border-spacing: 0px;
                      background-color: transparent;
                      width: 770px;
                    "
                    role="none"
                  >
                    <tr>
                      <td align="left" style="padding: 20px; margin: 0">
                        <table
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          role="none"
                          style="
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            border-collapse: collapse;
                            border-spacing: 0px;
                          "
                        >
                          <tr>
                            <td
                              align="left"
                              style="padding: 0; margin: 0; width: 730px"
                            >
                              <table
                                cellpadding="0"
                                cellspacing="0"
                                width="100%"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  border-collapse: collapse;
                                  border-spacing: 0px;
                                "
                              >
                                
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>
  </body>
</html>

  `;
}
