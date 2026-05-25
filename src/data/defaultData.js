export const defaultData = {
  phases: [
    {
      id: 'before',
      label: { ja: '依頼前', en: 'Inquiry' },
      directions: [
        {
          id: 'accept',
          label: { ja: '受ける', en: 'Accept' },
          buttons: [
            {
              id: 'b_accept_greet',
              label: { ja: '受諾・詳細確認', en: 'Accept & Review' },
              type: 'static',
              text:     { ja: 'この度はご依頼いただきありがとうございます。\n内容を確認のうえ、改めてご連絡いたします。\n少々お時間をいただく場合がございますが、何卒よろしくお願い申し上げます。', en: 'Thank you for your inquiry.\nI will review the details and get back to you shortly.\nI appreciate your patience in the meantime.' },
              textWarm: { ja: 'ご依頼のご相談ありがとうございます。内容を確認してからご連絡します。\n少々お時間をいただくかもしれませんがよろしくお願い致します。', en: "Thanks so much for reaching out! I'll take a look at the details and get back to you soon.\nCan't wait to check it out!" }
            },
            {
              id: 'b_confirm_budget',
              label: { ja: '予算確認', en: 'Check Budget' },
              type: 'static',
              text:     { ja: 'ご希望のご予算をお知らせいただけますでしょうか。', en: 'Could you please let me know your estimated budget for this project?' },
              textWarm: { ja: 'ご希望のご予算をお知らせいただけますか？', en: "What's your budget for this? Let me know so I can send over a proper quote!" }
            },
            {
              id: 'b_confirm_deadline',
              label: { ja: '納期確認', en: 'Check Deadline' },
              type: 'static',
              text:     { ja: 'ご希望のご納品日をお知らせいただけますでしょうか。', en: 'Could you please share your preferred deadline for this project?' },
              textWarm: { ja: 'ご希望の納品日をお知らせいただけますか？', en: 'When would you need this completed by?' }
            },
            {
              id: 'b_required_template',
              label: { ja: '必要事項テンプレ', en: 'Order Form' },
              type: 'static',
              text:     { ja: '制作にあたり、下記の項目をご記入いただけますでしょうか。\n\n・ご依頼の詳細：\n・ご予算：\n・ご希望納期：\n・商用利用の有無：\n・使用媒体・範囲：\n・その他ご要望：', en: 'To proceed with your request, could you please fill out the details below?\n\n・Project Details: \n・Budget: \n・Preferred Deadline: \n・Commercial Use: [Yes / No]\n・Platform / Usage Scope: \n・Other Requests: ' },
              textWarm: { ja: '制作のため、下記をご記入いただけますか？\n\n・ご依頼の詳細：\n・ご予算：\n・ご希望納期：\n・商用利用の有無：\n・使用媒体・範囲：\n・その他ご要望：', en: 'To get things started, could you fill in the template below?\n\n・Project Details: \n・Budget: \n・Preferred Deadline: \n *Commercial Use: [Yes / No]\n・Platform / Usage Scope: \n・Other Requests: ' }
            },
            {
              id: 'b_estimate',
              label: { ja: '見積もり提示', en: 'Send Estimate' },
              type: 'static',
              text:     { ja: 'お見積もりをご案内いたします。\n\n【お見積もり】\n品目：\n単価：\n数量：\n合計：\n\nお支払い期限：\nお支払い方法：\n\nご確認のうえ、ご不明な点がございましたらお気軽にお申し付けください。', en: 'Please find the estimate for your project below.\n\n【Estimate】\nItem: \nUnit Price: \nQuantity: \nTotal: \n\nPayment Due: \nPayment Method: \n\nPlease review the details, and feel free to reach out if you have any questions.' },
              textWarm: { ja: 'お見積もりをお送りします。\n\n【お見積もり】\n品目：\n単価：\n数量：\n合計：\n\nお支払い期限：\nお支払い方法：\n\nご不明な点はお気軽にお知らせください。', en: "Here's the estimate for your project!\n\n【Estimate】\nItem: \nUnit Price: \nQuantity: \nTotal: \n\nPayment Due: \nPayment Method: \n\nTake a look and let me know if everything looks good!" }
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
              label: { ja: '理由：予算', en: 'No: Budget' },
              type: 'static',
              text:     { ja: '誠に恐れ入りますが、ご提示いただいたご予算での制作は対応が難しい状況でございます。', en: 'Thank you for considering me for your project. Unfortunately, the proposed budget is below my minimum rate for this type of work, so I must respectfully decline.' },
              textWarm: { ja: '大変わけございませんが、ご提示いただいたご予算では対応が難しい状況です。', en: "Thank you so much for thinking of me! I'm sorry, but I'm unable to take this on at the proposed budget. Hope we can work together in the future!" }
            },
            {
              id: 'b_decline_deadline',
              label: { ja: '理由：納期', en: 'No: Deadline' },
              type: 'static',
              text:     { ja: '誠に恐れ入りますが、ご提示いただいた納期での制作は対応が難しい状況でございます。', en: 'Thank you for your inquiry. Unfortunately, I am unable to meet the requested deadline due to my current schedule.' },
              textWarm: { ja: '大変申し訳ございませんが、ご提示いただいた納期では対応が難しい状況です。', en: "Thanks for reaching out! I'm sorry, but I won't be able to make that deadline with my current workload." }
            },
            {
              id: 'b_decline_schedule',
              label: { ja: '理由：スケジュール', en: 'No: Schedule' },
              type: 'static',
              text:     { ja: '誠に恐れ入りますが、現在のスケジュールでは対応が難しい状況でございます。', en: 'Thank you for your interest in my work. Unfortunately, my queue is currently full and I am not accepting new commissions at this time.' },
              textWarm: { ja: '大変申し訳ございませんが、現在スケジュールがいっぱいで対応が難しい状況です。', en: "Thank you so much for thinking of me! I'm sorry, but my schedule is totally packed right now so I have to pass this time." }
            },
            {
              id: 'b_decline_other',
              label: { ja: '理由：その他', en: 'No: Other' },
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
              label: { ja: '制作開始（振込あり）', en: 'Start (Paid)' },
              type: 'static',
              text:     { ja: 'お世話になっております。\nお振込みを確認いたしました。これより制作を開始いたします。\nラフが完成次第、改めてご連絡いたします。\n引き続きどうぞよろしくお願い申し上げます。', en: 'Thank you — I have confirmed your payment.\nI will now begin working on your project and will update you as soon as the rough sketch is ready.' },
              textWarm: { ja: 'お振込みを確認いたしました。ありがとうございます。これより制作に入ります。\nラフができたらご連絡します。よろしくお願い致します。', en: "Payment confirmed — thank you! I'm super excited to get started.\nI'll send over the rough sketch as soon as it's ready!" }
            },
            {
              id: 'b_production_start_nopay',
              label: { ja: '制作開始（振込なし）', en: 'Start Work' },
              type: 'static',
              text:     { ja: 'お世話になっております。\nこれより制作を開始いたします。\nラフが完成次第、改めてご連絡いたします。\n引き続きどうぞよろしくお願い申し上げます。', en: 'I will now begin working on your project.\nI will update you as soon as the rough sketch is complete.' },
              textWarm: { ja: 'これより制作に入ります。\nラフができたらご連絡します。よろしくお願い致します。', en: "Getting started on your project now!\nI'll ping you once the rough sketch is ready." }
            },
            {
              id: 'b_rough_check',
              label: { ja: 'ラフ確認依頼', en: 'Send Rough' },
              type: 'static',
              text:     { ja: 'お世話になっております。\nラフを作成いたしましたのでご確認をお願いいたします。\n修正点がございましたらお知らせください。\nお手隙の際にご返信いただけますと幸いです。', en: 'The rough sketch is ready for your review.\nPlease see the attached file and let me know if you would like any revisions.' },
              textWarm: { ja: 'ラフができましたのでご確認いただけますか？\n修正点があればお知らせください。お時間のあるときにご返信いただけますと幸いです。', en: "Here's the rough sketch! Could you take a look and let me know what you think?\nFeel free to ask for changes!" }
            },
            {
              id: 'b_rough_revision_reply',
              label: { ja: 'ラフ修正あり返信', en: 'Revision Note' },
              type: 'static',
              text:     { ja: 'お世話になっております。\nご確認いただきありがとうございます。\nいただいた修正点をもとに修正いたします。\n引き続きよろしくお願い申し上げます。', en: 'Thank you for the feedback.\nI will update the sketch based on your notes and send you the revised version shortly.' },
              textWarm: { ja: 'ご確認ありがとうございます。\nいただいた修正点で修正いたします。引き続きよろしくお願い致します。', en: "Thanks for the notes!\nI'll get those changes sorted and show you the update soon!" }
            },
            {
              id: 'b_rough_no_revision',
              label: { ja: 'ラフ修正なし・清書へ', en: 'To Final Stage' },
              type: 'static',
              text:     { ja: 'お世話になっております。\nご確認いただきありがとうございます。\nこれより清書に入ります。\n引き続きどうぞよろしくお願い申し上げます。', en: 'Thank you for your approval. I will now proceed with the final artwork.' },
              textWarm: { ja: 'ご確認ありがとうございます。これより清書に入ります。\n引き続きよろしくお願い致します。', en: "Awesome, glad you like it! Moving on to the final version now!" }
            }
          ]
        }
      ]
    },
    {
      id: 'done',
      label: { ja: '完了', en: 'Completed' },
      directions: [
        {
          id: 'deliver',
          label: { ja: '納品', en: 'Delivery' },
          buttons: [
            {
              id: 'b_check_draft',
              label: { ja: '制作物確認依頼', en: 'Final Review' },
              type: 'static',
              text:     { ja: 'お世話になっております。\n制作物が完成いたしましたのでご確認をお願いいたします。\n大幅な変更が発生する場合は別途ご相談させてください。\n問題がなければ納品いたします。', en: "The final artwork is now complete. Please review the attached file.\nIf any minor adjustments are needed, please let me know. Once approved, I will deliver the final files." },
              textWarm: { ja: '完成しましたのでご確認いただけますか？\n大幅な変更が必要な場合は別途ご相談ください。問題なければ納品いたします。', en: "It's all done! Could you take a final look?\nIf there are any major changes needed, just let me know. Otherwise, I'll go ahead and send it over!" }
            },
            {
              id: 'b_delivery_complete',
              label: { ja: '納品完了', en: 'Deliver Files' },
              type: 'static',
              text:     { ja: 'お世話になっております。\n納品いたします。\nこの度はご依頼いただきありがとうございました。\nまたのご依頼をお待ちしております。', en: 'Please find the final deliverables attached.\nThank you very much for the commission — it was a pleasure working with you. I look forward to working with you again in the future.' },
              textWarm: { ja: '納品いたします。\nこの度はご依頼いただきありがとうございました。またいつでもご相談ください。', en: "Here are your files!\nThank you so much for commissioning me — I had a blast working on this. Feel free to reach out anytime!" }
            }
          ]
        }
      ]
    }
  ]
}
