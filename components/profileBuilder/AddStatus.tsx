import { Dimensions, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { FlatList, View } from 'react-native'
import { useEffect, useState } from 'react'
import NextStepButton from '../ui/NextStepButton'
import PreviousStepButton from '../ui/PreviousStepButton'
import { Step } from '../../types/Step'
import getOrientation from '../../utils/LockOrientation'
import Prompt from '../Prompt'
import Data from '../Data'

type AddStatusProps = {
  step: Step
  saveInput: (value: string | Array<string>, action: string) => void
  navigateToPreviousStep: (action: string) => void
  status: Array<string>
}

type ItemData = {
  id: string
  option: string
}
interface ItemProps {
  item: ItemData
  onPress: () => void
  backgroundColor: { backgroundColor: string }
}

const AddStatus = (props: AddStatusProps) => {
  const [options] = useState<any>(props?.step?.options)
  const [orientation, setOrientation] = useState<number>(1)
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [isInputValidated, setIsInputValidated] = useState(false)

  useEffect(() => {
    setLayout()
      if (props.status) { 
      setSelectedIds([...props.status])
      }
  }, [])

  const setLayout = async () => {
    const orientation = await getOrientation()
    setOrientation(orientation)
  }

    const handlePress = (id: string) => {
      console.log('clicked')
    if (selectedIds.includes(id)) {
      setSelectedIds((prevSelectedIds) =>
        prevSelectedIds.filter((item) => item !== id)
        )
    } else if (selectedIds.length < 3) {
        setSelectedIds((prevSelectedIds) => [...prevSelectedIds, id])
       setIsInputValidated(false)
      }
      console.log('length ', selectedIds.length)
        if (selectedIds.length === 3) {
            console.log('here')
            setIsInputValidated(true)
        }
        else { setIsInputValidated(false) }
  }

  const handleInput = (action: string) => {
    if (action === 'next') {
      props.saveInput(selectedIds, action)
    } else {
      props.navigateToPreviousStep(action)
    }
  }

  const Item = ({ item, onPress, backgroundColor }: ItemProps) => (
    <TouchableOpacity onPress={onPress} style={[styles.input, backgroundColor]}>
      <Text style={[styles.option]}>{item.option}</Text>
    </TouchableOpacity>
  )

  const renderItem = ({ item }: { item: ItemData }) => {
    const isSelected = selectedIds.includes(item.id)
    const backgroundColor = isSelected ? '#FEDED2' : 'lightgrey'

    return (
      <View style={{ width: Dimensions.get('window').width / 2 }}>
        <Item
          item={item}
          onPress={() => handlePress(item.id)}
          backgroundColor={{ backgroundColor }}
        />
      </View>
    )
  }

  return (
    <View style={{ alignItems: 'center' }}>
      <PreviousStepButton onSubmit={handleInput} action="prev" />
      <View style={{ marginTop: 3 }}>
        <Prompt text={props.step.prompt} />
      </View>

      <View style={{ marginTop: 3, marginBottom: 3 }}>
        <Data data={props.step.data} color={'#1D878C'} />
      </View>
      <FlatList
        data={options}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedIds}
        style={styles.flatList}
        numColumns={2}
      />
      <View style={{ marginTop: 2, marginBottom: 3 }}>
      <NextStepButton
          onSubmit={handleInput}
          action="Next"
          isInputValidated={selectedIds.length === 3} // Enable button
          styles={[
            styles.nextButton,
            selectedIds.length === 3 && styles.nextButtonEnabled, // Dynamic styling
          ]}
          caption="Next" activeOpacity={0}/>

        {/* <NextStepButton
          onSubmit={handleInput}
          action="next"
            isInputValidated={selectedIds.length === 3}
            styles={isInputValidated && nextStepButtonStyle.validatedInput}
          caption={'Next'}
          activeOpacity={0}
        /> */}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  flatList: {
    height: 250, // Set your desired height here
  },
  input: {
    alignContent: 'center',
    margin: 5,
    borderRadius: 20,
    padding: 10,
  },
  option: {
    fontSize: 14,
  },
  nextButton: {
    padding: 5,
    borderRadius: 10,
    alignItems: 'center',
  },
  nextButtonEnabled: {
    backgroundColor: 'salmon',
    color: 'white'
    
  },
})

export default AddStatus
