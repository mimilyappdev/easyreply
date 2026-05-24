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
              id: 'b_accept_greet',
              label: { ja: '受諾・詳細確認', en: 'Accept & Confirm' },
              type: 'static',
              text:     { ja: 'この度はご依頼いただきありがとうございます。\n内容を確認のうえ、改めてご連絡いたします。\n少々お時間をいただく場合がございますが、何卒よろしくお願い申し上げます。', en: '' },
              textWarm: { ja: 'ご依頼のご相談ありがとうございます。内容を確認してからご連絡します。少々お時間をいただくかもしれませんがよろしくお願い致します。', en: '' }
            },
            {
              id: 'b_confirm_budget',
              label: { ja: '予算確認', en: 'Confirm Budget' },
              type: 'static',
              text:     { ja: 'ご希望のご予算をお知らせいただけますでしょうか。', en: '' },
              textWarm: { ja: 'ご希望のご予算をお知らせいただけますか？', en: '' }
            },
            {
              id: 'b_confirm_deadline',
              label: { ja: '納期確認', en: 'Confirm Deadline' },
              type: 'static',
              text:     { ja: 'ご希望の納品日をお知らせいただけますでしょうか。', en: '' },
              textWarm: { ja: 'ご希望の納品日をお知らせいただけますか？', en: '' }
            },
            {
              id: 'b_required_template',
              label: { ja: '必要事項テンプレ', en: 'Request Template' },
              type: 'static',
              text:     { ja: '制作にあたり、下記の項目をご記入いただけますでしょうか。\n\n・ご依頼の詳細：\n・ご予算：\n・ご希望納期：\n・商用利用の有無：\n・使用媒体・範囲：\n・その他ご要望：', en: '' },
              textWarm: { ja: '制作のため、下記をご記入いただけますか？\n\n・ご依頼の詳細：\n・ご予算：\n・ご希望納期：\n・商用利用の有無：\n・使用媒体・範囲：\n・その他ご要望：', en: '' }
            },
            {
              id: 'b_estimate',
              label: { ja: '見積もり提示', en: 'Estimate' },
              type: 'static',
              text:     { ja: 'お見積もりをご案内いたします。\n\n【お見積もり】\n品目：\n単価：\n数量：\n合計：\n\nお支払い期限：\nお支払い方法：\n\nご確認のうえ、ご不明な点がございましたらお気軽にお申し付けください。', en: '' },
              textWarm: { ja: 'お見積もりをお送りします。\n\n【お見積もり】\n品目：\n単価：\n数量：\n合計：\n\nお支払い期限：\nお支払い方法：\n\nご不明な点はお気軽にお知らせください。', en: '' }
            },
            {
              id: 'b_payment_info',
              label: { ja: '振込先案内', en: 'Payment Info' },
              type: 'input',
              text: { ja: '', en: '' }
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
              text:     { ja: '誠に恐れ入りますが、ご提示いただいたご予算での制作は対応が難しい状況でございます。', en: '' },
              textWarm: { ja: '大変申し訳ございませんが、ご提示いただいたご予算では対応が難しい状況です。', en: '' }
            },
            {
              id: 'b_decline_deadline',
              label: { ja: '理由：納期', en: 'Reason: Deadline' },
              type: 'static',
              text:     { ja: '誠に恐れ入りますが、ご提示いただいた納期での制作は対応が難しい状況でございます。', en: '' },
              textWarm: { ja: '大変申し訳ございませんが、ご提示いただいた納期では対応が難しい状況です。', en: '' }
            },
            {
              id: 'b_decline_schedule',
              label: { ja: '理由：スケジュール', en: 'Reason: Schedule' },
              type: 'static',
              text:     { ja: '誠に恐れ入りますが、現在のスケジュールでは対応が難しい状況でございます。', en: '' },
              textWarm: { ja: '大変申し訳ございませんが、現在スケジュールがいっぱいで対応が難しい状況です。', en: '' }
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
              id: 'b_production_start_paid',
              label: { ja: '制作開始（振込あり）', en: 'Start (paid)' },
              type: 'static',
              text:     { ja: 'お世話になっております。\nお振込みを確認いたしました。これより制作を開始いたします。\nラフが完成次第、改めてご連絡いたします。\n引き続きどうぞよろしくお願い申し上げます。', en: '' },
              textWarm: { ja: 'お振込みを確認いたしました。ありがとうございます。これより制作に入ります。ラフができたらご連絡します。よろしくお願い致します。', en: '' }
            },
            {
              id: 'b_production_start_nopay',
              label: { ja: '制作開始（振込なし）', en: 'Start (no payment)' },
              type: 'static',
              text:     { ja: 'お世話になっております。\nこれより制作を開始いたします。\nラフが完成次第、改めてご連絡いたします。\n引き続きどうぞよろしくお願い申し上げます。', en: '' },
              textWarm: { ja: 'これより制作に入ります。ラフができたらご連絡します。よろしくお願い致します。', en: '' }
            },
            {
              id: 'b_rough_check',
              label: { ja: 'ラフ確認依頼', en: 'Rough Draft Review' },
              type: 'static',
              text:     { ja: 'お世話になっております。\nラフを作成いたしましたのでご確認をお願いいたします。\n修正点がございましたらお知らせください。\nお手隙の際にご返信いただけますと幸いです。', en: '' },
              textWarm: { ja: 'ラフができましたのでご確認いただけますか？修正点があればお知らせください。お時間のあるときにご返信いただけますと幸いです。', en: '' }
            },
            {
              id: 'b_rough_revision_reply',
              label: { ja: 'ラフ修正あり返信', en: 'Rough Revision Reply' },
              type: 'static',
              text:     { ja: 'お世話になっております。\nご確認いただきありがとうございます。\nいただいた修正点をもとに修正いたします。\n引き続きよろしくお願い申し上げます。', en: '' },
              textWarm: { ja: 'ご確認ありがとうございます。いただいた修正点で修正いたします。引き続きよろしくお願い致します。', en: '' }
            },
            {
              id: 'b_rough_no_revision',
              label: { ja: 'ラフ修正なし・清書へ', en: 'Rough Approved' },
              type: 'static',
              text:     { ja: 'お世話になっております。\nご確認いただきありがとうございます。\nこれより清書に入ります。\n引き続きどうぞよろしくお願い申し上げます。', en: '' },
              textWarm: { ja: 'ご確認ありがとうございます。これより清書に入ります。引き続きよろしくお願い致します。', en: '' }
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
              label: { ja: '制作物確認依頼', en: 'Draft Check' },
              type: 'static',
              text:     { ja: 'お世話になっております。\n制作物が完成いたしましたのでご確認をお願いいたします。\n大幅な変更が発生する場合は別途ご相談させてください。\n問題がなければ納品いたします。', en: '' },
              textWarm: { ja: '完成しましたのでご確認いただけますか？大幅な変更が必要な場合は別途ご相談ください。問題なければ納品いたします。', en: '' }
            },
            {
              id: 'b_delivery_complete',
              label: { ja: '納品完了', en: 'Delivery Complete' },
              type: 'static',
              text:     { ja: 'お世話になっております。\n納品いたします。\nこの度はご依頼いただきありがとうございました。\nまたのご依頼をお待ちしております。', en: '' },
              textWarm: { ja: '納品いたします。この度はご依頼いただきありがとうございました。またいつでもご相談ください。', en: '' }
            }
          ]
        }
      ]
    }
  ]
}
