import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import AppButton from '../../components/AppButton';
import {colors, spacing, typography, borderRadius, shadows} from '../../theme/theme';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

interface OnboardingScreenProps {
  onComplete: () => void;
}

interface OnboardingSlide {
  id: number;
  title: string;
  subtitle: string;
  illustration: {
    backgroundColor: string;
    icon: string;
  };
}

const slides: OnboardingSlide[] = [
  {
    id: 1,
    title: 'Discover Circles Around You',
    subtitle: 'Connect with people and communities in your area. Find like-minded individuals and build meaningful relationships.',
    illustration: {
      backgroundColor: colors.primaryLight,
      icon: '🌐',
    },
  },
  {
    id: 2,
    title: 'Share Posts and Earn Rewards',
    subtitle: 'Express yourself through posts and engage with others. Get rewarded for your participation and creativity.',
    illustration: {
      backgroundColor: '#FFF4E6',
      icon: '🎁',
    },
  },
  {
    id: 3,
    title: 'Track Your Loyalty and Benefits',
    subtitle: 'Monitor your progress, unlock achievements, and enjoy exclusive benefits as you grow within the community.',
    illustration: {
      backgroundColor: '#E8F5E8',
      icon: '🏆',
    },
  },
];

const OnboardingScreen = ({onComplete}: OnboardingScreenProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      const nextSlide = currentSlide + 1;
      setCurrentSlide(nextSlide);
      scrollViewRef.current?.scrollTo({
        x: nextSlide * screenWidth,
        animated: true,
      });
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const handleScroll = (event: any) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
    setCurrentSlide(slideIndex);
  };

  const renderSlide = (slide: OnboardingSlide, index: number) => (
    <View key={slide.id} style={styles.slide}>
      <View style={styles.content}>
        {/* Illustration */}
        <View style={[styles.illustrationContainer, {backgroundColor: slide.illustration.backgroundColor}]}>
          <Text style={styles.illustrationIcon}>{slide.illustration.icon}</Text>
        </View>

        {/* Text Content */}
        <View style={styles.textContent}>
          <Text style={styles.title}>{slide.title}</Text>
          <Text style={styles.subtitle}>{slide.subtitle}</Text>
        </View>
      </View>

      {/* Pagination Dots */}
      <View style={styles.pagination}>
        {slides.map((_, dotIndex) => (
          <View
            key={dotIndex}
            style={[
              styles.dot,
              dotIndex === currentSlide ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>

      {/* Navigation Buttons */}
      <View style={styles.navigation}>
        <AppButton
          title={index === slides.length - 1 ? 'Get Started' : 'Next'}
          onPress={handleNext}
          size="md"
          style={styles.nextButton}
        />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Skip Button */}
      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      {/* Slides */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        scrollEventThrottle={16}
        style={styles.scrollView}
      >
        {slides.map((slide, index) => renderSlide(slide, index))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  skipButton: {
    position: 'absolute',
    top: spacing.lg,
    right: spacing.lg,
    zIndex: 1,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  skipText: {
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
    fontWeight: typography.fontWeight.medium,
  },
  scrollView: {
    flex: 1,
  },
  slide: {
    width: screenWidth,
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xxl * 2,
    paddingBottom: spacing.xl,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  illustrationContainer: {
    width: 200,
    height: 200,
    borderRadius: borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xxl,
    ...shadows.medium,
  },
  illustrationIcon: {
    fontSize: 80,
  },
  textContent: {
    alignItems: 'center',
    paddingHorizontal: spacing.md,
  },
  title: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: spacing.md,
    lineHeight: typography.fontSize.xxl * 1.3,
  },
  subtitle: {
    fontSize: typography.fontSize.lg,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: typography.fontSize.lg * 1.5,
    paddingHorizontal: spacing.sm,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: colors.primary,
    width: 24,
  },
  inactiveDot: {
    backgroundColor: colors.border,
  },
  navigation: {
    width: '100%',
    paddingHorizontal: spacing.lg,
  },
  nextButton: {
    width: '100%',
    borderRadius: borderRadius.xl,
    paddingVertical: spacing.sm + 2, // Reduced height
    ...shadows.medium,
    backgroundColor: colors.primary,
  },
});

export default OnboardingScreen;