/**
 * @Author- Prince Patel
 */
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import EventMap from './components/EventMap';
import SessionList from './components/SessionList';
import EntryPass from './components/EntryPass';
import Header from './components/Header';
import AddEventModal from './components/AddEventModal';
import CheckInHistoryModal from './components/CheckInHistoryModal';
import { scheduleNotification } from './components/notifications';

//  default events
const initialSessions = [
  {
    id: '1',
    title: 'Hamilton Waterfront Party',
    description:
      'Join us for a lively evening party at the Hamilton waterfront featuring live music, food trucks, and dancing.',
    time: '08:00 PM',
    coordinates: { latitude: 43.2557, longitude: -79.8711 }, // Hamilton city center
  },
  {
    id: '2',
    title: 'Hamilton Arts Festival',
    description:
      'Experience a celebration of local art and culture with exhibitions, street performers, and creative workshops.',
    time: '01:00 PM',
    coordinates: { latitude: 43.26, longitude: -79.87 }, // near downtown
  },
  {
    id: '3',
    title: 'Hamilton Tech Meetup',
    description:
      'Network with local tech enthusiasts and professionals at this monthly meetup featuring industry insights and interactive demos.',
    time: '06:00 PM',
    coordinates: { latitude: 43.25, longitude: -79.865 }, // in the tech hub area
  },
  {
    id: '4',
    title: 'Hamilton Food Fair',
    description:
      'Taste the best of Hamilton’s culinary scene at the Food Fair, with gourmet treats from local vendors and food trucks.',
    time: '11:00 AM',
    coordinates: { latitude: 43.257, longitude: -79.88 }, // a little west of downtown
  },
  {
    id: '5',
    title: 'Hamilton Cultural Parade',
    description:
      'Celebrate diversity with a vibrant cultural parade showcasing music, dance, and art from communities across Hamilton.',
    time: '02:00 PM',
    coordinates: { latitude: 43.253, longitude: -79.875 }, // near central park area
  },
];

const App = () => {
  const [sessions, setSessions] = useState(initialSessions);
  const [checkIns, setCheckIns] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [addEventModalVisible, setAddEventModalVisible] = useState(false);
  const [checkInModalVisible, setCheckInModalVisible] = useState(false);

  const handleCheckIn = (session) => {
    setCheckIns((prev) => [...prev, session.title]);
    scheduleNotification(session.title);
    setSelectedSession(session);
  };

  const closeEntryPass = () => setSelectedSession(null);
  const openAddEventModal = () => setAddEventModalVisible(true);
  const closeAddEventModal = () => setAddEventModalVisible(false);
  const openCheckInHistoryModal = () => setCheckInModalVisible(true);
  const closeCheckInHistoryModal = () => setCheckInModalVisible(false);

  const handleAddEvent = (newEvent) => {
    setSessions((prev) => [...prev, newEvent]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        onAddEvent={openAddEventModal}
        onSettings={() => alert('Exit clicked')}
        onCheckInHistory={openCheckInHistoryModal}
      />
      <ScrollView>
        <EventMap sessions={sessions} onCheckIn={handleCheckIn} />
        <SessionList sessions={sessions} onCheckIn={handleCheckIn} />
      </ScrollView>
      {selectedSession && (
        <EntryPass session={selectedSession} onClose={closeEntryPass} />
      )}
      <AddEventModal
        visible={addEventModalVisible}
        onClose={closeAddEventModal}
        onAddEvent={handleAddEvent}
      />
      <CheckInHistoryModal
        visible={checkInModalVisible}
        onClose={closeCheckInHistoryModal}
        checkIns={checkIns}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
