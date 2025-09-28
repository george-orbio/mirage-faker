import { AnimatePresence, motion } from 'framer-motion';
import { Loader2, Wand2 } from 'lucide-react';
import { useGeneratorStore } from '@/store/generator-store';
import { DATA_DEFINITIONS, DataCategory } from '@/lib/data-definitions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
export function GeneratorForm() {
  const {
    category,
    selectedFields,
    quantity,
    isLoading,
    setCategory,
    toggleField,
    setQuantity,
    generateData,
  } = useGeneratorStore();
  const currentCategoryDef = DATA_DEFINITIONS.find(def => def.id === category);
  return (
    <Card className="w-full overflow-hidden shadow-lg border-gray-200/50 dark:border-gray-800/50">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">Controls</CardTitle>
        <CardDescription>Select a category and fields to generate data.</CardDescription>
      </CardHeader>
      <CardContent className="p-8 pt-0 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
          <div className="md:col-span-2 space-y-2">
            <Label htmlFor="category" className="text-lg font-medium">Category</Label>
            <Select onValueChange={(value: DataCategory) => setCategory(value)} value={category ?? ''}>
              <SelectTrigger id="category" className="w-full text-base py-6">
                <SelectValue placeholder="Select a data category..." />
              </SelectTrigger>
              <SelectContent>
                {DATA_DEFINITIONS.map(def => (
                  <SelectItem key={def.id} value={def.id} className="text-base">{def.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="quantity" className="text-lg font-medium">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              min="1"
              max="10000"
              className="w-full text-base py-6"
            />
          </div>
        </div>
        <AnimatePresence>
          {currentCategoryDef && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="space-y-3 pt-4">
                <Label className="text-lg font-medium">Fields</Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {currentCategoryDef.fields.map(field => (
                    <div key={field.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={field.id}
                        checked={!!selectedFields[field.id]}
                        onCheckedChange={() => toggleField(field.id)}
                      />
                      <label
                        htmlFor={field.id}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        {field.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="pt-4">
          <Button
            size="lg"
            className="w-full text-lg py-7 font-semibold bg-blue-600 hover:bg-blue-700 transition-all duration-200 active:scale-95"
            onClick={generateData}
            disabled={isLoading || !category || Object.values(selectedFields).every(v => !v)}
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <Wand2 className="mr-2 h-5 w-5" />
            )}
            Generate
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}