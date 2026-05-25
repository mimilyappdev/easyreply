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
              text:     { ja: 'この度はご依頼いただきありがとうございます。\n内容を確認のうえ、改めてご連絡いたします。\n少々お時間をいただく場合がございますが、何卒よろしくお願い申し上げます。', en: 'Thank you for your inquiry.\nI will review the details and get back to you shortly.\nPlease allow me a little time to respond — I appreciate your patience.' },
              textWarm: { ja: 'ご依頼のご相談ありがとうございます。内容を確認してからご連絡します。少々お時間をいただくかもしれませんがよろしくお願い致します。', en: 'Thanks so much for reaching out! I\'ll take a look at the details and get back to you soon. Bear with me while I review everything!' }
            },
            {
              id: 'b_confirm_budget',
              label: { ja: '予算確認', en: 'Confirm Budget' },
              type: 'static',
              text:     { ja: 'ご希望のご予算をお知らせいただけますでしょうか。', en: 'Could you please share your budget for this project?' },
              textWarm: { ja: 'ご希望のご予算をお知らせいただけますか？', en: 'What\'s your budget for this? I\'d love to know so I can put together a proper quote!' }
            },
            {
              id: 'b_confirm_deadline',
              label: { ja: '納期確認', en: 'Confirm Deadline' },
              type: 'static',
              text:     { ja: 'ご希望の納品日をお知らせいただけますでしょうか。', en: 'Could you please let me know your preferred delivery date?' },
              textWarm: { ja: 'ご希望の納品日をお知らせいただけますか？', en: 'When would you need this by?' }
            },
            {
              id: 'b_required_template',
              label: { ja: '必要事項テンプレ', en: 'Request Template' },
              type: 'static',
              text:     { ja: '制作にあたり、下記の項目をご記入いただけますでしょうか。\n\n・ご依頼の詳細：\n・ご予算：\n・ご希望納期：\n・商用利用の有無：\n・使用媒体・範囲：\n・その他ご要望：', en: 'To move forward with the project, could you please provide the following?\n\n・Project details:\n・Budget:\n・Preferred deadline:\n・Commercial use: Yes / No\n・Platform / usage scope:\n・Other requests:' },
              textWarm: { ja: '制作のため、下記をご記入いただけますか？\n\n・ご依頼の詳細：\n・ご予算：\n・ご希望納期：\n・商用利用の有無：\n・使用媒体・範囲：\n・その他ご要望：', en: 'To get things started, could you fill in the details below?\n\n・Project details:\n・Budget:\n・Preferred deadline:\n・Commercial use: Yes / No\n・Platform / usage scope:\n・Other requests:' }
            },
            {
              id: 'b_estimate',
              label: { ja: '見積もり提示', en: 'Estimate' },
              type: 'static',
              text:     { ja: 'お見積もりをご案内いたします。\n\n【お見積もり】\n品目：\n単価：\n数量：\n合計：\n\nお支払い期限：\nお支払い方法：\n\nご確認のうえ、ご不明な点がございましたらお気軽にお申し付けください。', en: 'Please find my estimate below.\n\n【Estimate】\nItem:\nUnit price:\nQuantity:\nTotal:\n\nPayment due:\nPayment method:\n\nPlease review the above, and feel free to reach out with any questions.' },
              textWarm: { ja: 'お見積もりをお送りします。\n\n【お見積もり】\n品目：\n単価：\n数量：\n合計：\n\nお支払い期限：\nお支払い方法：\n\nご不明な点はお気軽にお知らせください。', en: 'Here\'s my estimate for your project!\n\n【Estimate】\nItem:\nUnit price:\nQuantity:\nTotal:\n\nPayment due:\nPayment method:\n\nLet me know if you have any questions!' }
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
              text:     { ja: '誠に恐れ入りますが、ご提示いただいたご予算での制作は対応が難しい状況でございます。', en: 'Thank you for considering me for this project. Unfortunately, the proposed budget is below my minimum rate for this type of work.' },
              textWarm: { ja: '大変申し訳ございませんが、ご提示いただいたご予算では対応が難しい状況です。', en: 'Thank you so much for thinking of me! I\'m sorry, but I\'m not able to take this on at the proposed budget.' }
            },
            {
              id: 'b_decline_deadline',
              label: { ja: '理由：納期', en: 'Reason: Deadline' },
              type: 'static',
              text:     { ja: '誠に恐れ入りますが、ご提示いただいた納期での制作は対応が難しい状況でございます。', en: 'Thank you for your inquiry. Unfortunately, I\'m unable to meet the requested deadline given my current workload.' },
              textWarm: { ja: '大変申し訳ございませんが、ご提示いただいた納期では対応が難しい状況です。', en: 'Thanks for reaching out! I\'m sorry, but I don\'t think I can meet that deadline with my current schedule.' }
            },
            {
              id: 'b_decline_schedule',
              label: { ja: '理由：スケジュール', en: 'Reason: Schedule' },
              type: 'static',
              text:     { ja: '誠に恐れ入りますが、現在のスケジュールでは対応が難しい状況でございます。', en: 'Thank you for your inquiry. Unfortunately, my schedule is currently full and I\'m unable to take on new projects at this time.' },
              textWarm: { ja: '大変申し訳ございませんが、現在スケジュールがいっぱいで対応が難しい状況です。', en: 'Thank you so much for thinking of me! I\'m sorry, but my schedule is packed right now and I can\'t take on new work.' }
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
              text:     { ja: 'お世話になっております。\nお振込みを確認いたしました。これより制作を開始いたします。\nラフが完成次第、改めてご連絡いたします。\n引き続きどうぞよろしくお願い申し上げます。', en: 'Thank you — I have confirmed your payment.\nI will now begin working on your project and will be in touch once the rough draft is ready.\nThank you for your continued support.' },
              textWarm: { ja: 'お振込みを確認いたしました。ありがとうございます。これより制作に入ります。ラフができたらご連絡します。よろしくお願い致します。', en: 'Payment confirmed — thank you! I\'m excited to get started. I\'ll reach out once the rough draft is ready!' }
            },
            {
              id: 'b_production_start_nopay',
              label: { ja: '制作開始（振込なし）', en: 'Start (no payment)' },
              type: 'static',
              text:     { ja: 'お世話になっております。\nこれより制作を開始いたします。\nラフが完成次第、改めてご連絡いたします。\n引き続きどうぞよろしくお願い申し上げます。', en: 'I will now begin working on your project and will be in touch once the rough draft is complete.\nThank you for your continued support.' },
              textWarm: { ja: 'これより制作に入ります。ラフができたらご連絡します。よろしくお願い致します。', en: 'I\'m getting started on your project now! I\'ll reach out once the rough draft is ready.' }
            },
            {
              id: 'b_rough_check',
              label: { ja: 'ラフ確認依頼', en: 'Rough Draft Review' },
              type: 'static',
              text:     { ja: 'お世話になっております。\nラフを作成いたしましたのでご確認をお願いいたします。\n修正点がございましたらお知らせください。\nお手隙の際にご返信いただけますと幸いです。', en: 'The rough draft is now complete — please take a moment to review it.\nLet me know if you have any feedback or revisions.\nNo rush; please reply when you get a chance.' },
              textWarm: { ja: 'ラフができましたのでご確認いただけますか？修正点があればお知らせください。お時間のあるときにご返信いただけますと幸いです。', en: 'The rough draft is ready! Could you take a look? Feel free to let me know if you\'d like any changes — no rush!' }
            },
            {
              id: 'b_rough_revision_reply',
              label: { ja: 'ラフ修正あり返信', en: 'Rough Revision Reply' },
              type: 'static',
              text:     { ja: 'お世話になっております。\nご確認いただきありがとうございます。\nいただいた修正点をもとに修正いたします。\n引き続きよろしくお願い申し上げます。', en: 'Thank you for your feedback.\nI will revise the rough draft based on your comments.\nThank you for your continued support.' },
              textWarm: { ja: 'ご確認ありがとうございます。いただいた修正点で修正いたします。引き続きよろしくお願い致します。', en: 'Thanks for the notes! I\'ll get those revisions done right away.' }
            },
            {
              id: 'b_rough_no_revision',
              label: { ja: 'ラフ修正なし・清書へ', en: 'Rough Approved' },
              type: 'static',
              text:     { ja: 'お世話になっております。\nご確認いただきありがとうございます。\nこれより清書に入ります。\n引き続きどうぞよろしくお願い申し上げます。', en: 'Thank you for your approval.\nI will now proceed with the final artwork.\nThank you for your continued support.' },
              textWarm: { ja: 'ご確認ありがとうございます。これより清書に入ります。引き続きよろしくお願い致します。', en: 'Great to hear! I\'ll move on to the final version now.' }
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
              text:     { ja: 'お世話になっております。\n制作物が完成いたしましたのでご確認をお願いいたします。\n大幅な変更が発生する場合は別途ご相談させてください。\n問題がなければ納品いたします。', en: 'The artwork is now complete — please review the attached file.\nIf significant changes are required, please let me know and we can discuss further.\nOnce you give the green light, I will proceed with delivery.' },
              textWarm: { ja: '完成しましたのでご確認いただけますか？大幅な変更が必要な場合は別途ご相談ください。問題なければ納品いたします。', en: 'It\'s done! Could you take a look? If there are any major changes needed, just let me know. Otherwise, I\'ll go ahead and send it over!' }
            },
            {
              id: 'b_delivery_complete',
              label: { ja: '納品完了', en: 'Delivery Complete' },
              type: 'static',
              text:     { ja: 'お世話になっております。\n納品いたします。\nこの度はご依頼いただきありがとうございました。\nまたのご依頼をお待ちしております。', en: 'Please find the final deliverable attached.\nThank you very much for this commission — it was a pleasure working with you.\nI hope to have the opportunity to work together again.' },
              textWarm: { ja: '納品いたします。この度はご依頼いただきありがとうございました。またいつでもご相談ください。', en: 'Here\'s your delivery! Thank you so much for commissioning me — it was a pleasure working with you. Feel free to reach out anytime!' }
            }
          ]
        }
      ]
    }
  ]
}
