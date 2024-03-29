/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
    Box,
    Container,
    Grid,
    GridItem,
    HStack,
    Heading,
    Icon,
    Text,
    VStack,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Flex,
} from "@chakra-ui/react";
import { PiTentThin } from "react-icons/pi";
import { FiUser, FiUsers } from "react-icons/fi";

export default function BookingList({ bookings }) {
    const groupedBookings = bookings.bookingList.reduce(
        (result, { bookingType }) => {
            result[bookingType] += 1;
            return result;
        },
        {
            group: 0,
            individual: 0,
        }
    );
    return (
        <Container maxW="4xl" py="2">
            <Grid
                templateColumns={{
                    base: "repeat(1, 1fr)",
                    md: "repeat(2, 1fr)",
                    lg: "repeat(3, 1fr)",
                }}
                gap={4}
            >
                <GridItem w="100%">
                    <StatsSimpleIcon
                        title="Total Tents"
                        icon={PiTentThin}
                        count={bookings.tents}
                    />
                </GridItem>
                <GridItem w="100%">
                    <StatsSimpleIcon
                        title="Group Bookings"
                        icon={FiUsers}
                        count={groupedBookings.group}
                    />
                </GridItem>
                <GridItem w="100%">
                    <StatsSimpleIcon
                        title="Individual Bookings"
                        icon={FiUser}
                        count={groupedBookings.individual}
                    />
                </GridItem>
            </Grid>
            <BookingTable list={bookings.bookingList} />
        </Container>
    );
}

const StatsSimpleIcon = ({ title, icon, count }) => {
    return (
        <Box
            bg="white"
            rounded="md"
            shadow="sm"
            p="4"
            border="1px"
            borderColor="gray.200"
        >
            <Heading as="h2" size="sm" fontWeight="normal">
                {title}
            </Heading>
            <HStack pt="2">
                <VStack
                    align="center"
                    justify="center"
                    w="12"
                    h="12"
                    rounded="md"
                    border="1px"
                    borderColor="gray.200"
                >
                    <Icon as={icon} boxSize="7" />
                </VStack>
                <Text fontWeight="bold" fontSize="2xl">
                    {count}
                </Text>
            </HStack>
        </Box>
    );
};

const BookingTable = ({ list }) => {
    return (
        <TableContainer py="4">
            <Heading as="h1" size="md">
                Booking List
            </Heading>
            {!list.length ? (
                <Text w="100%" fontSize="lg" bg="gray.50" rounded="md" py="4" my="2" textAlign="center">
                    Empty Bookings List
                </Text>
            ) : (
                <Table variant="striped" colorScheme="gray">
                    <Thead>
                        <Tr>
                            <Th>id</Th>
                            <Th>user name</Th>
                            <Th>booking type</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {list.map(({ id, userName, bookingType }) => (
                            <TableRow
                                key={id}
                                id={id}
                                userName={userName}
                                bookingType={bookingType}
                            />
                        ))}
                    </Tbody>
                </Table>
            )}
        </TableContainer>
    );
};

const TableRow = ({ id, userName, bookingType }) => {
    return (
        <Tr>
            <Td>{id}</Td>
            <Td>{userName}</Td>
            <Td>{bookingType}</Td>
        </Tr>
    );
};
