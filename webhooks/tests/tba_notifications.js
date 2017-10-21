module.exports = {
  upcoming_match: {
    message_data: {
      event_name: 'New England FRC Region Championship',
      scheduled_time: 1397330280,
      match_key: '2014necmp_f1m1',
      team_keys: [
        'frc195',
        'frc558',
        'frc5122',
        'frc177',
        'frc230',
        'frc4055'
      ],
      predicted_time: 1397330280
    },
    message_type: 'upcoming_match'
  },
  match_score: {
    message_data: {
      event_name: 'New England FRC Region Championship',
      match: {
        comp_level: 'f',
        match_number: 1,
        videos: [],
        time_string: '3:18 PM',
        set_number: 1,
        key: '2014necmp_f1m1',
        time: 1397330280,
        score_breakdown: null,
        alliances: {
          blue: {
            score: 154,
            teams: [
              'frc177',
              'frc230',
              'frc4055'
            ]
          },
          red: {
            score: 78,
            teams: [
              'frc195',
              'frc558',
              'frc5122'
            ]
          }
        },
        event_key: '2014necmp'
      }
    },
    message_type: 'match_score'
  },
  starting_comp_level: {
    message_data: {
      event_name: 'New England FRC Region Championship',
      comp_level: 'f',
      event_key: '2014necmp',
      scheduled_time: 1397330280
    },
    message_type: 'starting_comp_level'
  },
  alliance_selection: {
    message_data: {
      event: {
        key: '2014necmp',
        website: 'http://www.nefirst.org/',
        official: true,
        end_date: '2014-04-12',
        name: 'New England FRC Region Championship',
        short_name: 'New England',
        facebook_eid: null,
        event_district_string: 'New England',
        venue_address: 'Boston University\nAgganis Arena\nBoston, MA 02215\nUSA',
        event_district: 3,
        location: 'Boston, MA, USA',
        event_code: 'necmp',
        year: 2014,
        webcast: [],
        alliances: [
          {
            declines: [],
            picks: [
              'frc195',
              'frc558',
              'frc5122'
            ]
          },
          {
            declines: [],
            picks: [
              'frc1153',
              'frc125',
              'frc4048'
            ]
          },
          {
            declines: [],
            picks: [
              'frc230',
              'frc177',
              'frc4055'
            ]
          },
          {
            declines: [],
            picks: [
              'frc716',
              'frc78',
              'frc811'
            ]
          },
          {
            declines: [],
            picks: [
              'frc1519',
              'frc3467',
              'frc58'
            ]
          },
          {
            declines: [],
            picks: [
              'frc131',
              'frc175',
              'frc1073'
            ]
          },
          {
            declines: [],
            picks: [
              'frc228',
              'frc3525',
              'frc2168'
            ]
          },
          {
            declines: [],
            picks: [
              'frc172',
              'frc1058',
              'frc2067'
            ]
          }
        ],
        event_type_string: 'District Championship',
        start_date: '2014-04-10',
        event_type: 2
      }
    },
    message_type: 'alliance_selection'
  },
  awards_posted: {
    message_data: {
      event_name: 'New England FRC Region Championship',
      awards: [
        {
          event_key: '2014necmp',
          award_type: 0,
          name: "Regional Chairman's Award",
          recipient_list: [
            {
              team_number: 2067,
              awardee: null
            },
            {
              team_number: 78,
              awardee: null
            },
            {
              team_number: 811,
              awardee: null
            },
            {
              team_number: 2648,
              awardee: null
            }
          ],
          year: 2014
        }
      ]
    },
    message_type: 'awards_posted'
  },
  media_posted: {
    message_data: {},
    message_type: 'media_posted'
  },
  district_points_updated: {
    message_data: {},
    message_type: 'district_points_updated'
  },
  schedule_updated: {
    message_data: {
      event_name: 'New England FRC Region Championship',
      first_match_time: 1397330280,
      event_key: '2014necmp'
    },
    message_type: 'schedule_updated'
  },
  final_results: {
    message_data: {},
    message_type: 'final_results'
  },
  ping: {
    message_data: {
      desc: 'This is a test message ensuring your device can recieve push messages from The Blue Alliance.',
      title: 'Test Message'
    },
    message_type: 'ping'
  },
  broadcast: {
    message_data: {
      title: 'Test',
      desc: 'Test Broadcast',
      url: 'http://foo.bar',
      app_version: '2.0.0'
    },
    message_type: 'broadcast'
  },
  verification: {
    message_data: {
      verification_key: '8279a61abdeee0cf46a86136bf888188a4b18cdf'
    },
    message_type: 'verification'
  }
}
