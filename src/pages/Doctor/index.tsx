import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  DoctorCategory,
  Gap,
  HomeProfile,
  NewstItem,
  RatedDoctor,
} from '../../components';
import {colors, fonts, showError} from '../../utils';
import {child, equalTo, get, orderByChild, query, ref} from 'firebase/database';
import {fireDB} from '../../config';

type RootStackParamList = {
  ChooseDoctor: undefined;
  UserProfile: undefined;
  DoctorProfile: undefined;
};

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

const Doctor = ({navigation}: Props) => {
  const [news, setNews] = useState([]);
  const [categoryDoctor, setCategoryDoctor] = useState([]);
  const [topRatedDoctor, setTopRatedDoctor] = useState<any[]>([]);

  useEffect(() => {
    getNews();
    getCategoryDoctor();
    getTopRatedDoctor();
  }, []);

  const getNews = () => {
    get(child(ref(fireDB), 'news'))
      .then(res => {
        if (res.exists()) {
          setNews(res.val());
        }
      })
      .catch(err => showError(err.message));
  };

  const getCategoryDoctor = () => {
    get(child(ref(fireDB), 'category_doctor'))
      .then(res => {
        if (res.exists()) {
          setCategoryDoctor(res.val());
        }
      })
      .catch(err => showError(err.message));
  };

  const getTopRatedDoctor = () => {
    const getTop = query(
      ref(fireDB, 'users'),
      orderByChild('role'),
      equalTo('doctor'),
    );

    get(getTop)
      .then(snapshot => {
        if (snapshot.exists()) {
          const doctor: any[] = [];
          snapshot.forEach((item: any) => {
            doctor.push(item.val());
          });
          // Sort posts berdasarkan rate tertinggi
          doctor.sort((a, b) => b.rate - a.rate);
          // Limit hasil ke 3 posts teratas
          const topDoctor = doctor.slice(0, 3);

          setTopRatedDoctor(topDoctor);
        }
      })
      .catch(err => showError(err.message));
  };

  return (
    <View style={styles.page}>
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.wrapperSection}>
            <Gap height={30} />
            <HomeProfile onPress={() => navigation.navigate('UserProfile')} />
            <Text style={styles.welcome}>
              Mau konsultasi dengan siapa hari ini?
            </Text>
          </View>
          <View style={styles.wrapperScroll}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.category}>
                <Gap width={32} />
                {categoryDoctor.map((category: any) => (
                  <DoctorCategory
                    key={category.id}
                    category={category.category}
                    onPress={() =>
                      navigation.navigate('ChooseDoctor', category)
                    }
                  />
                ))}
                <Gap width={22} />
              </View>
            </ScrollView>
          </View>
          <View style={styles.wrapperSection}>
            <Text style={styles.sectionLabel}>Top Rated Doctors</Text>
            {topRatedDoctor.map(doctor => (
              <RatedDoctor
                key={doctor.uid}
                name={doctor.fullName}
                desc={doctor.specialist}
                avatar={doctor.photo ? {uri: doctor.photo} : null}
                onPress={() => navigation.navigate('DoctorProfile', doctor)}
              />
            ))}
          </View>
          <View style={styles.wrapperSection}>
            <Text style={styles.sectionLabel}>Good News</Text>
          </View>
          {news.map((newsItem: any) => (
            <NewstItem
              key={newsItem.id}
              date={newsItem.date}
              title={newsItem.title}
              image={newsItem.image}
            />
          ))}
          <Gap height={30} />
        </ScrollView>
      </View>
    </View>
  );
};

export default Doctor;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.secondary,
    flex: 1,
  },
  content: {
    backgroundColor: colors.white,
    flex: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  wrapperSection: {
    paddingHorizontal: 16,
  },
  welcome: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 30,
    marginBottom: 16,
  },
  category: {
    flexDirection: 'row',
  },
  wrapperScroll: {
    marginHorizontal: -16,
  },
  sectionLabel: {
    fontSize: 16,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 30,
    marginBottom: 16,
  },
});
