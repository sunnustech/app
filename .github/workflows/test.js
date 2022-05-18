const yes = {
  ok: true,
  result: [
    {
      update_id: 502073508,
      my_chat_member: {
        chat: {
          id: -646035026,
          title: 'Build Notifications',
          type: 'group',
          all_members_are_administrators: true,
        },
        from: {
          id: 257481278,
          is_bot: false,
          first_name: 'khang',
          username: 'nguyenvukhang',
        },
        date: 1652853224,
        old_chat_member: {
          user: {
            id: 5283818611,
            is_bot: true,
            first_name: 'Expo Build',
            username: 'expo_build_bot',
          },
          status: 'left',
        },
        new_chat_member: {
          user: {
            id: 5283818611,
            is_bot: true,
            first_name: 'Expo Build',
            username: 'expo_build_bot',
          },
          status: 'member',
        },
      },
    },
    {
      update_id: 502073509,
      message: {
        message_id: 3,
        from: {
          id: 257481278,
          is_bot: false,
          first_name: 'khang',
          username: 'nguyenvukhang',
        },
        chat: {
          id: -646035026,
          title: 'Build Notifications',
          type: 'group',
          all_members_are_administrators: true,
        },
        date: 1652853224,
        group_chat_created: true,
      },
    },
  ],
}

const api = 'https://api.telegram.org/bot5283818611:AAG62UULojDVFfbx0i1dX4Pz00xizJdqf4k/sendMessage?chat_id=257481278&text=Test%20message'
