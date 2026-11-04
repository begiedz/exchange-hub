import { Text } from '@/components/ui/text';
import { useRouter } from 'expo-router';
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

import { Screen } from '@/components/layout/screen';
import { Card, CardContent } from '@/components/ui/card';
import { WalletBalance } from '@/components/wallet/wallet-balance';
import { WalletCard } from '@/components/wallet/wallet-card';
import { useWallet } from '@/hooks/queries/use-wallet';
import { getWalletBalance } from '@/lib/wallet';
import { TransactionsList } from '@/components/transactions/transaction-list';

export default function HomeScreen() {
  const router = useRouter();

  const { data: wallet, isPending, isError } = useWallet();

  const plnBalance = getWalletBalance(wallet, 'PLN');

  return (
    <Screen
      scrollable
      contentClassName="gap-4"
    >
      {/* 1. Górny pasek: Saldo i Awatar */}
      <View className="flex-row items-center justify-between px-2">
        <WalletBalance
          balance={plnBalance}
          isPending={isPending}
          isError={isError}
        />
      </View>

      {/* 2. Dwie karty u góry: Send Money oraz Receive */}
      <View className="flex-row gap-3">
        {/* Send Money  */}
        <Pressable
          onPress={() => router.push('/withdraw')}
          accessibilityRole="button"
          accessibilityLabel="Withdraw PLN from your wallet"
          className="flex-1 active:opacity-60"
        >
          <Card>
            <CardContent>
              <View className="mb-3 h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
                <ArrowUpRight
                  size={20}
                  className="text-emerald-600"
                  color="#059669"
                />
              </View>
              <Text className="text-base font-bold text-foreground">
                Send Money
              </Text>
              <Text className="mt-0.5 text-xs text-muted-foreground">
                Cash out the balance
              </Text>
            </CardContent>
          </Card>
        </Pressable>

        {/* Receive */}
        <Pressable
          onPress={() => router.push('/transfer-top-up')}
          className="flex-1 active:opacity-60"
        >
          <Card>
            <CardContent>
              <View className="mb-3 h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                <ArrowDownLeft
                  size={20}
                  className="text-blue-600"
                  color="#2563eb"
                />
              </View>
              <Text className="text-base font-bold text-foreground">
                Receive
              </Text>
              <Text className="mt-0.5 text-xs text-muted-foreground">
                Get paid in PLN
              </Text>
            </CardContent>
          </Card>
        </Pressable>
      </View>

      <WalletCard
        wallet={wallet}
        isPending={isPending}
        isError={isError}
      />

      {/* 4. Sekcja: Recent Activity */}
      <View className="mb-4">
        <Text className="mb-3 px-1 text-lg font-bold text-foreground">
          Recent Activity
        </Text>
        <TransactionsList pagination={false} />
      </View>
    </Screen>
  );
}
