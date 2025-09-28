import { useState, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Clipboard, Download, ArrowUpDown } from 'lucide-react';
import Papa from 'papaparse';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import vscDarkPlus from 'react-syntax-highlighter/dist/esm/styles/prism/vsc-dark-plus';
import { toast } from 'sonner';
import { useGeneratorStore, GeneratedData } from '@/store/generator-store';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
type SortConfig = {
  key: string;
  direction: 'ascending' | 'descending';
} | null;
function useCopyToClipboard() {
  const [copied, setCopied] = useState(false);
  const copy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      toast.success('Copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    }, () => {
      toast.error('Failed to copy to clipboard.');
    });
  };
  return { copied, copy };
}
function TableView({ data }: { data: GeneratedData[] }) {
  const [sortConfig, setSortConfig] = useState<SortConfig>(null);
  const sortedData = useMemo(() => {
    if (!sortConfig) {
      return data;
    }
    return [...data].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];
      if (aVal < bVal) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (aVal > bVal) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortConfig]);
  const requestSort = (key: string) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };
  if (data.length === 0) return null;
  const headers = Object.keys(data[0]);
  return (
    <ScrollArea className="h-[400px] border rounded-md">
      <Table>
        <TableHeader className="sticky top-0 bg-muted/50 backdrop-blur-sm">
          <TableRow>
            {headers.map(header => (
              <TableHead key={header}>
                <Button variant="ghost" onClick={() => requestSort(header)} className="px-2 py-1 h-auto -ml-2">
                  {header}
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedData.map((row, rowIndex) => (
            <TableRow key={rowIndex} className="hover:bg-muted/50">
              {headers.map(header => <TableCell key={`${rowIndex}-${header}`}>{String(row[header])}</TableCell>)}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
}
function JsonView({ data }: { data: GeneratedData[] }) {
  const jsonString = JSON.stringify(data, null, 2);
  return (
    <ScrollArea className="h-[400px] bg-[#1e1e1e] rounded-md p-4">
      <SyntaxHighlighter language="json" style={vscDarkPlus} customStyle={{ margin: 0, background: 'transparent' }}>
        {jsonString}
      </SyntaxHighlighter>
    </ScrollArea>
  );
}
function CsvView({ data }: { data: GeneratedData[] }) {
  const csvString = Papa.unparse(data);
  return (
    <ScrollArea className="h-[400px] bg-muted rounded-md p-4">
      <pre className="text-sm whitespace-pre-wrap break-all">{csvString}</pre>
    </ScrollArea>
  );
}
export function DataDisplay() {
  const { results, generationTime } = useGeneratorStore();
  const { copied: copiedJson, copy: copyJson } = useCopyToClipboard();
  const { copied: copiedCsv, copy: copyCsv } = useCopyToClipboard();
  const { copied: copiedTsv, copy: copyTsv } = useCopyToClipboard();
  const jsonString = JSON.stringify(results, null, 2);
  const csvString = Papa.unparse(results);
  const tsvString = Papa.unparse(results, { delimiter: '\t' });
  const downloadCsv = () => {
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'mirage-data.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('CSV download started.');
  };
  if (results.length === 0) {
    return null;
  }
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full shadow-lg border-gray-200/50 dark:border-gray-800/50">
          <CardContent className="p-8">
            <Tabs defaultValue="table">
              <div className="flex justify-between items-center mb-4">
                <TabsList>
                  <TabsTrigger value="table">Table</TabsTrigger>
                  <TabsTrigger value="json">JSON</TabsTrigger>
                  <TabsTrigger value="csv">CSV</TabsTrigger>
                </TabsList>
                {generationTime && (
                  <p className="text-sm text-muted-foreground">
                    Generated {results.length} records in {generationTime.toFixed(2)}ms
                  </p>
                )}
              </div>
              <TabsContent value="table">
                 <div className="relative">
                    <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-8 w-8 z-10" onClick={() => copyTsv(tsvString)}>
                      {copiedTsv ? <Check className="h-4 w-4" /> : <Clipboard className="h-4 w-4" />}
                    </Button>
                    <TableView data={results} />
                 </div>
              </TabsContent>
              <TabsContent value="json">
                <div className="relative">
                  <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-8 w-8" onClick={() => copyJson(jsonString)}>
                    {copiedJson ? <Check className="h-4 w-4" /> : <Clipboard className="h-4 w-4" />}
                  </Button>
                  <JsonView data={results} />
                </div>
              </TabsContent>
              <TabsContent value="csv">
                <div className="relative">
                  <div className="absolute top-2 right-2 flex gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => copyCsv(csvString)}>
                      {copiedCsv ? <Check className="h-4 w-4" /> : <Clipboard className="h-4 w-4" />}
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={downloadCsv}>
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                  <CsvView data={results} />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}