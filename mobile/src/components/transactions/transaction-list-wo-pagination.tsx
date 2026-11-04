import { TransactionCard } from '@/components/transactions/transaction-card';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { useTransactions } from '@/hooks/queries/use-transactions';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import { useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

const PAGE_SIZE = 10;

export function TransactionsListwoPagination() {
  const [page, setPage] = useState(1);

  const { data, isPending, isError, isFetching } = useTransactions({
    page,
    pageSize: PAGE_SIZE,
  });

  const transactions = data?.items ?? [];

  // divide the total transaction count by the page size and round up
  // to include the last page even if it contains fewer items
  // ensure at least one page exists when the transaction list is empty
  const totalPages = Math.max(
    1,
    Math.ceil(Number(data?.totalCount ?? 0) / PAGE_SIZE),
  );

  if (isPending) {
    return (
      <View className="items-center py-8">
        <ActivityIndicator />
      </View>
    );
  }

  if (isError) {
    return (
      <Text className="py-8 text-center text-destructive">
        Failed to load transactions.
      </Text>
    );
  }

  return (
    <View className="gap-4">
      {/* Transaction cards */}
      <View className="gap-3">
        {transactions.length === 0 ? (
          <Text className="py-8 text-center text-muted-foreground">
            No transactions yet.
          </Text>
        ) : (
          transactions.map(item => (
            <TransactionCard
              key={item.id}
              item={item}
            />
          ))
        )}
      </View>
    </View>
  );
}
