import React, { forwardRef, useCallback, useMemo } from 'react';
import { View, Text } from 'react-native';
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';

interface CustomBottomSheetProps {
  title?: string;
  children: React.ReactNode;
  snapPoints?: string[];
  onDismiss?: () => void;
}

export const BottomSheet = forwardRef<BottomSheetModal, CustomBottomSheetProps>(
  ({ title, children, snapPoints = ['50%'], onDismiss }, ref) => {
    
    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          opacity={0.7}
        />
      ),
      []
    );

    return (
      <BottomSheetModal
        ref={ref}
        snapPoints={snapPoints}
        onDismiss={onDismiss}
        backdropComponent={renderBackdrop}
        backgroundStyle={{ backgroundColor: '#F4F4F4' }} // athledia-card
        handleIndicatorStyle={{ backgroundColor: '#495057' }} // athledia-slate
      >
        <BottomSheetView className="flex-1 px-6 pb-6 pt-2">
          {title && (
            <Text className="text-athledia-dark text-xl font-black mb-4 text-center font-serif uppercase tracking-tight">
              {title}
            </Text>
          )}
          {children}
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);

BottomSheet.displayName = 'BottomSheet';
