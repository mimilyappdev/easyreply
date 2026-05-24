export const defaultData = {
  phases: [
    {
      id: 'before',
      label: { ja: '依頼前', en: 'Before Request' },
      directions: [
        {
          id: 'accept',
          label: { ja: '受ける', en: 'Accept' },
          buttons: [
            {
              id: 'b_accept_guide',
              label: { ja: '受諾・見積案内', en: 'Accept & Quote' },
              type: 'static',
              text: { ja: '頂戴しました内容からお見積もりを作成いたしますので少々お待ちくださいませ。\n\n3営業日程度でご返信しておりますが、お急ぎの場合は一言いただければ幸いです。', en: '' }
            },
            {
              id: 'b_confirm_budget',
              label: { ja: '予算確認', en: 'Confirm Budget' },
              type: 'static',
              text: { ja: 'ご予算を教えていただけないでしょうか。', en: '' }
            },
            {
              id: 'b_confirm_deadline',
              label: { ja: '納期確認', en: 'Confirm Deadline' },
              type: 'static',
              text: { ja: '納品希望日を教えていただけないでしょうか。', en: '' }
            },
            {
              id: 'b_required_template',
              label: { ja: '必要事項テンプレ', en: 'Request Template' },
              type: 'static',
              text: { ja: '制作を希望のものに関して、下記テンプレートに記載いただけますでしょうか。\n\n【ご依頼の際のテンプレート】\n・ご依頼内容：\n・ご予算：\n・商用利用の有無：\n・詳細：\n・使用範囲：\n・支払い方法：\n・ご希望納期：', en: '' }
            }
          ]
        },
        {
          id: 'condition',
          label: { ja: '受ける（詳細確認）', en: 'Accept (with conditions)' },
          buttons: [
            {
              id: 'b_quote_confirm',
              label: { ja: '見積確認後連絡', en: 'Quote Confirmed' },
              type: 'static',
              text: { ja: 'お見積りをご確認いただきましてありがとうございます。\nお支払いに関しては全額前払いをお願いしております。\n銀行振込または仲介サイトの利用も可能です。振込手数料はご負担いただいております。\n\nご検討の程よろしくお願い申し上げます。', en: '' }
            }
          ]
        },
        {
          id: 'decline',
          label: { ja: '断る', en: 'Decline' },
          buttons: [
            {
              id: 'b_decline_budget',
              label: { ja: '理由：予算', en: 'Reason: Budget' },
              type: 'static',
              text: { ja: '現在ご提示いただいている予算では制作が難しい状況です。', en: '' }
            },
            {
              id: 'b_decline_deadline',
              label: { ja: '理由：納期', en: 'Reason: Deadline' },
              type: 'static',
              text: { ja: '現在ご提示いただいている納期では制作が難しい状況です。', en: '' }
            },
            {
              id: 'b_decline_schedule',
              label: { ja: '理由：スケジュール', en: 'Reason: Schedule' },
              type: 'static',
              text: { ja: '現在スケジュールが合わないため、制作が難しい状況です。', en: '' }
            },
            {
              id: 'b_decline_other',
              label: { ja: '理由：その他', en: 'Reason: Other' },
              type: 'input',
              text: { ja: '', en: '' }
            }
          ]
        }
      ]
    },
    {
      id: 'during',
      label: { ja: '依頼中', en: 'In Progress' },
      directions: [
        {
          id: 'progress',
          label: { ja: '制作', en: 'Production' },
          buttons: [
            {
              id: 'b_production_start',
              label: { ja: '制作開始連絡', en: 'Start Notice' },
              type: 'static',
              text: { ja: 'お忙しいところお振込みいただき有難うございました。\nこれより制作に入ります。\nラフもしくはデザインが完成しましたら、ご連絡いたします。\n引き続き何卒よろしくお願い申し上げます。', en: '' }
            },
            {
              id: 'b_rough_check',
              label: { ja: 'ラフ確認', en: 'Rough Draft Review' },
              type: 'static',
              text: { ja: 'ラフを作成致しましたのでご確認お願い致します。\n気になるところや修正点があれば画像内にでも直接記載いただいて大丈夫です。\nお忙しい中大変申し訳ありませんが、お手隙の際にご返信いただけますと幸いです。', en: '' }
            },
            {
              id: 'b_rough_revision_reply',
              label: { ja: 'ラフ修正あり返信', en: 'Rough Revision Reply' },
              type: 'static',
              text: { ja: 'お忙しいところ、ラフを確認いただき有難うございます。\nいただきました修正点で再度修正いたします。\n引き続きよろしくお願い申し上げます。', en: '' }
            },
            {
              id: 'b_rough_no_revision',
              label: { ja: 'ラフ修正なし返信', en: 'Rough Approved' },
              type: 'static',
              text: { ja: 'お忙しいところ、ラフを確認いただき有難うございます。\nこれより清書に入ります。\n引き続き何卒よろしくお願い申し上げます。', en: '' }
            }
          ]
        }
      ]
    },
    {
      id: 'done',
      label: { ja: '完了', en: 'Complete' },
      directions: [
        {
          id: 'deliver',
          label: { ja: '納品', en: 'Delivery' },
          buttons: [
            {
              id: 'b_check_draft',
              label: { ja: '制作物確認', en: 'Draft Check' },
              type: 'static',
              text: { ja: 'デザインを作成致しましたのでご確認お願い致します。\n色味や簡易的な修正は可能ですが、大幅に変更や修正が発生する場合は修正費が必要となります。\n問題なければ最終調整して納品致します。\nお手隙の際にご返信いただけますと幸いです。', en: '' }
            },
            {
              id: 'b_delivery_with_payment',
              label: { ja: '納品＆完了（振込あり）', en: 'Delivery & Complete (paid)' },
              type: 'static',
              text: { ja: 'お振込みの確認が取れましたので納品いたします。\nまたのご依頼を心よりお待ちしております。', en: '' }
            },
            {
              id: 'b_delivery_no_payment',
              label: { ja: '納品＆完了（振込なし）', en: 'Delivery & Complete' },
              type: 'static',
              text: { ja: '納品いたします。\nまたのご依頼を心よりお待ちしております。', en: '' }
            }
          ]
        }
      ]
    }
  ]
}
